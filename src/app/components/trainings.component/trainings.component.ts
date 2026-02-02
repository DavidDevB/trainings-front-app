import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Training } from '../../models/training.model';
import { CartService } from '../../services/cart.service';
import { SearchbarComponent } from '../searchbar.component/searchbar.component';
import { MaxPriceComponent } from "../max-price.component/max-price.component";

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
  constructor(public cartService: CartService) {}

  ngOnInit(): void {
    this.displayTrainings();
    this.cartService.showCart = false;
  }

  displayTrainings() {
    this.allTrainings = [
      { id: 1, name: 'Java', category: 'Backend', description: 'Formation Java SE 9 sur 5 jours', price: 1500, quantity: 1 },
      { id: 2, name: 'DotNet', category: 'Programming', description: 'Formation DotNet 3 jours', price: 1000, quantity: 1 },
      { id: 3, name: 'Python', category: 'Backend', description: 'Formation Python/Django 5 jours', price: 1500, quantity: 1 },
      { id: 4, name: 'Angular', category: 'Frontend', description: 'Formation Angular 4 jours', price: 1200, quantity: 1 },
      { id: 5, name: 'React', category: 'Frontend', description: 'Formation React 4 jours', price: 1200, quantity: 1 },
      { id: 6, name: 'Vue.js', category: 'Frontend', description: 'Formation Vue.js 4 jours', price: 1200, quantity: 1 },
      { id: 7, name: 'Node.js', category: 'Web Development', description: 'Formation Node.js 5 jours', price: 1500, quantity: 1 },
    ];
    this.listTrainings = [...this.allTrainings];
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
