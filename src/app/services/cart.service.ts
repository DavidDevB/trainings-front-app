import { Injectable } from '@angular/core';
import { Training } from '../models/training.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {

  private trainingsInCart: Training[] = [];
  showCart: boolean = false;
  
  constructor() {

  }

  displayTrainingsInCart(): void {
    this.showCart = true;
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

  removeFromCart(trainingId: number) {
    this.trainingsInCart = this.trainingsInCart.filter(training => training.id !== trainingId);
  }

}