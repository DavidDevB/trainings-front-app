import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-max-price',
  imports: [FormsModule],
  templateUrl: './max-price.component.html',
  styleUrl: './max-price.component.css',
})
export class MaxPriceComponent {

  maxPrice: number = 0;

  @Output() priceChange = new EventEmitter<number>();

  constructor() {}

  setMaxPrice(price: number) {
    this.maxPrice = price;
    this.priceChange.emit(this.maxPrice);
  }

  onPriceInput(value: string): void {
    const price = Number(value);  
    this.setMaxPrice(price);
  }

  clearMaxPrice(): void {
    this.maxPrice = 0;
    this.priceChange.emit(this.maxPrice);
  }
}
