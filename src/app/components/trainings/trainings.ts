import { Component, OnInit } from '@angular/core';
import { Training } from '../../models/training.model';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-trainings',
  imports: [],
  templateUrl: './trainings.html',
  styleUrl: './trainings.css',
})
export class TrainingComponent implements OnInit {
  listTrainings : Training[] | undefined;
  constructor() {}

  ngOnInit(): void {
    
  }

  displayTrainings() {
    this.listTrainings = [
      { id: 1, name: 'Java', description: 'Formation Java SE 9 sur 5 jours', price: 1500, quantity: 1 },
      { id: 2, name: 'DotNet', description: 'Formation DotNet 3 jours', price: 1000, quantity: 1 },
      { id: 3, name: 'Python', description: 'Formation Python/Django 5 jours', price: 1500, quantity: 1 },
    ];
  }

  onAddToCart(training: Training) {
    console.log(`Ajout au panier de la formation ${training.name} en quantité ${training.quantity}`);
  }
}