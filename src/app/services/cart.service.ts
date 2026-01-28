import { Injectable } from '@angular/core';
import { Training } from '../models/training.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {

  private trainingsInCart: Training[] = [];
  
  constructor() {

  }

  addToCart(training: Training) {
    this.trainingsInCart.push(training);
  }

  getCartContent(): Training[] {
    return this.trainingsInCart
  }

  getTotalPrice(): number {
    return this.trainingsInCart.reduce((total, training) => total + (training.price * training.quantity), 0);
  }

}