import { Component } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { FormsModule } from '@angular/forms';
import { OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-cart',
  imports: [FormsModule, MatButtonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {

  constructor(public cartService: CartService) {}

  ngOnInit(): void {
      this.cartService.showCart = true;
      console.log('CartComponent initialized, showCart set to', this.cartService.showCart);
  }


}
