import { Component } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { TrainingComponent } from '../trainings.component/trainings.component';
import { OnInit } from '@angular/core';
import { Training } from '../../models/training.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-form.component',
  imports: [FormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css',
})
export class FormComponent implements OnInit{
  userData: { [key: string]: string } = {
    name: '',
    firstName: '',
    address: '',
    phone: '',
    email: ''
  };

  listTrainings : Training[] | undefined;
  

  constructor(public cartService: CartService) {
  }

  ngOnInit() {
      this.cartService.showCart = false;
    }

  onSubmit() {
    console.log('Form submitted:', this.userData);
    alert('Formulaire soumis avec succès !');
  }

  
}
