import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-searchbar',
  imports: [FormsModule],
  templateUrl: './searchbar.component.html',
  styleUrl: './searchbar.component.css',
})
export class SearchbarComponent {
  searchQuery: string = '';

  @Output() searchChange = new EventEmitter<string>();

  constructor() {}

  onSearchInput(value: string): void {
    this.searchQuery = value.trim();
    this.searchChange.emit(this.searchQuery);
  }

  clearSearch(): void {
    this.searchQuery = '';
    this.searchChange.emit(this.searchQuery);
  }

}
