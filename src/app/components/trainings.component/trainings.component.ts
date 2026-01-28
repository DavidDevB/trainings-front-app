import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Training } from '../../models/training.model';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-trainings',
  imports: [FormsModule],
  templateUrl: './trainings.component.html',
  styleUrl: './trainings.component.css',
})
export class TrainingComponent implements OnInit {
  listTrainings : Training[] | undefined;
  constructor(public cartService: CartService) {}

  ngOnInit(): void {
    this.displayTrainings();
    this.cartService.showCart = false;
  }

  displayTrainings() {
    this.listTrainings = [
      { id: 1, name: 'Java', description: 'Formation Java SE 9 sur 5 jours', price: 1500, quantity: 1 },
      { id: 2, name: 'DotNet', description: 'Formation DotNet 3 jours', price: 1000, quantity: 1 },
      { id: 3, name: 'Python', description: 'Formation Python/Django 5 jours', price: 1500, quantity: 1 },
    ];
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
}