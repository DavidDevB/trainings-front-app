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
    const existingTraining = this.trainingsInCart.find(t => t.id === training.id);
    if (existingTraining) {
      existingTraining.quantity!++;
      return;
    } else {
    this.trainingsInCart.push(training);
    }
  }

  getCartContent(): Training[] {
    return this.trainingsInCart
  }

  getTotalPrice(): number {
    return this.trainingsInCart.reduce((total, training) => total + (training.price * training.quantity), 0);
  }

  removeFromCart(id: number) {
  const index = this.trainingsInCart.findIndex(item => item.id === id);
  if (index !== -1) {
    this.trainingsInCart[index].quantity!--;
    if (this.trainingsInCart[index].quantity === 0) {
      this.trainingsInCart.splice(index, 1);
    }
  }
}

}