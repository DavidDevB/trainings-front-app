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

  addToCart(training: Training) {
    const existingTraining = this.trainingsInCart.find(t => t.id === training.id);
    if (existingTraining) {
      existingTraining.quantity += training.quantity;
      localStorage.setItem('cart', JSON.stringify(this.trainingsInCart));
    } else {
    this.trainingsInCart.push({...training});
    localStorage.setItem('cart', JSON.stringify(this.trainingsInCart));
    }
  }

  getCartContent(): Training[] {
    return localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')!) : [];
  }

  getTotalPrice(): number {
    return this.trainingsInCart.reduce((total, training) => total + (training.price * training.quantity), 0);
  }

  removeFromCart(id: number) {
    const index = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')!).findIndex((item: Training) => item.id === id) : -1;
    if (index !== -1) {
      this.trainingsInCart[index].quantity!--;
      localStorage.setItem('cart', JSON.stringify(this.trainingsInCart));
      if (JSON.parse(localStorage.getItem('cart')!)[index].quantity === 0) {
        this.trainingsInCart.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(this.trainingsInCart));
      }
    }
  }

}