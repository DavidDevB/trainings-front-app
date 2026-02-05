import { Component, OnInit, ChangeDetectorRef, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Training } from '../../models/training.model';
import { CartService } from '../../services/cart.service';
import { SearchbarComponent } from '../searchbar.component/searchbar.component';
import { MaxPriceComponent } from "../max-price.component/max-price.component";
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-trainings',
  imports: [FormsModule, SearchbarComponent, MaxPriceComponent],
  templateUrl: './trainings.component.html',
  styleUrl: './trainings.component.css',
})
export class TrainingComponent implements OnInit {
  listTrainings : Training[] | undefined;
  allTrainings: Training[] = [];
  maxPrice: number = 0;
  searchQuery: string = '';
  @Output() itemAddedToCart = new EventEmitter<number>();

  constructor(public cartService: CartService, private apiService: ApiService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.displayTrainings();
    this.cartService.showCart = false;
  }

  displayTrainings() {
    this.apiService.getTrainings().subscribe({
      next : (data) => {
        this.allTrainings = data;
        this.listTrainings = [...this.allTrainings];
        this.cdr.detectChanges();
      },
      error : (err) => console.error('Erreur lors de la récupération des formations : ', err),
      complete : () => console.log('Récupération des formations terminée.')
    });
  }

  onAddToCart(training: Training) {
    if (training.quantity < 1) {
      alert('La quantité doit être au moins 1');
      training.quantity = 1;
      return;
    } 

    const trainingToAdd = { 
    ...training, 
    quantity: training.quantity 
  };
  
    this.cartService.addToCart(trainingToAdd);
  
    training.quantity = 1;
    this.itemAddedToCart.emit(this.cartService.getCartContent().length);
  }

  onSearchChange(query: string): void { 
    this.searchQuery = query;
    this.onFilter(this.searchQuery, this.maxPrice);
  }
  
  isSortedAsc: boolean = true;

  orderByCategory(): void {
    if (!this.listTrainings) return;

    if (this.isSortedAsc) {
      this.listTrainings = [...this.listTrainings].sort((a, b) => 
        b.category.localeCompare(a.category)
      );
    } else {
      this.listTrainings = [...this.listTrainings].sort((a, b) => 
        a.category.localeCompare(b.category)
      );
    }

    this.isSortedAsc = !this.isSortedAsc;
  }

  onMaxPriceChange(maxPrice: number): void {
    this.maxPrice = maxPrice;
    this.onFilter(this.searchQuery, this.maxPrice);
  }

  onFilter(query: string, maxPrice: number): void {
    this.listTrainings = this.allTrainings.filter(training => {
      const matchesQuery = !query || query.trim() === '' ||
        training.name.toLowerCase().includes(query.toLowerCase()) ||
        training.description.toLowerCase().includes(query.toLowerCase());
      const matchesPrice = maxPrice <= 0 || training.price <= maxPrice;
      return matchesQuery && matchesPrice;
    });
  }
}
