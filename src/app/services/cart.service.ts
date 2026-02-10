import { Injectable, afterNextRender, signal, computed } from '@angular/core';
import { Training } from '../models/training.model';
import { ApiService } from './api.service';
import { Cart } from '../models/cart.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {

  private trainingsInCart: Training[] = [];
  showCart: boolean = false;

  private cartSignal = signal<Training[]>([]);
  cartItemCount = computed(() => 
    this.cartSignal().reduce((total, training) => total + training.quantity, 0)
  );
  
  constructor(private apiService: ApiService) {
    afterNextRender(() => {
      this.loadCart();
    });
  }

  private loadCart() {
    const cart = localStorage.getItem('cart');
    this.trainingsInCart = cart ? JSON.parse(cart) : [];
    this.cartSignal.set([...this.trainingsInCart]);
  }

  private saveCart() {
    localStorage.setItem('cart', JSON.stringify(this.trainingsInCart));
    this.cartSignal.set([...this.trainingsInCart]); 
  }

  addToCart(training: Training) {
    const existingTraining = this.trainingsInCart.find(t => t.id === training.id);
    if (existingTraining) {
      existingTraining.quantity += training.quantity;
      this.saveCart();
    } else {
    this.trainingsInCart.push({...training});
    this.saveCart();
    }
    this.saveCart();
  }

  getCartContent(): Training[] {
    return this.trainingsInCart;
  }

  getTotalPrice(): number {
    return this.trainingsInCart.reduce((total, training) => total + (training.price * training.quantity), 0);
  }

  removeFromCart(id: string) {
    const index = this.trainingsInCart.findIndex(item => item.id === id);
    if (index !== -1) {
      this.trainingsInCart[index].quantity!--; 
      if (this.trainingsInCart[index].quantity === 0) {
        this.trainingsInCart.splice(index, 1);
        this.saveCart();
      }
    }
  }

  checkout(cartContent: Cart[]) {
    if (cartContent.length === 0) {
      alert('Votre panier est vide. Veuillez ajouter des formations avant de passer la commande.');
      return;
    }

    const newOrder = {
      id: Date.now().toString(),
      userId: 'currentUserId',
      trainings: cartContent.map(t => ({ id: t.id, quantity: t.quantity })),
      totalPrice: this.getTotalPrice(),
      orderDate: new Date()
    };

    const orders = localStorage.getItem('orders') ? JSON.parse(localStorage.getItem('orders')!) : [];
    orders.push(newOrder);
    localStorage.setItem('orders', JSON.stringify(orders));

    this.apiService.addOrder(newOrder).subscribe({
      next: () => {
        alert('Commande passée avec succès !');
        this.trainingsInCart = [];
        localStorage.removeItem('cart');
        this.cartSignal.set([]);
      },
      error: (error) => {
        console.error('Erreur lors de la soumission de la commande:', error);
        alert('Une erreur est survenue lors de la soumission de la commande. Veuillez réessayer.');
      }
    });



  }

}