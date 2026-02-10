import { Component } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { FormsModule } from '@angular/forms';
import { OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-cart',
  imports: [FormsModule, MatButtonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {

  constructor(public cartService: CartService, private themeService: ThemeService) {}

  ngOnInit(): void {
      this.cartService.showCart = true;
      console.log('CartComponent initialized, showCart set to', this.cartService.showCart);
  }

  get theme() {
    return this.themeService.theme();
  }

  checkout() {
    if (this.cartService.getCartContent().length === 0) {
      alert('Votre panier est vide. Veuillez ajouter des formations avant de passer la commande.');
      return;
    }
    this.cartService.checkout(this.cartService.getCartContent());
  }
}
