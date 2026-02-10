import { Component } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { OnInit } from '@angular/core';
import { Training } from '../../models/training.model';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-form.component',
  imports: [FormsModule, MatButtonModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css',
})
export class FormComponent implements OnInit{
  userData: { [key: string]: string } = {
    lastName: '',
    firstName: '',
    phone: '',
    email: ''
  };

  listTrainings : Training[] | undefined;
  

  constructor(public cartService: CartService) {
  }

  ngOnInit() {
      this.cartService.showCart = false;
    }
}
