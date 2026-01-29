import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-searchbar',
  imports: [FormsModule],
  templateUrl: './searchbar.component.html',
  styleUrl: './searchbar.component.css',
})
export class SearchbarComponent {
  searchQuery: string = '';

  onSearchInput(): void {
    console.log('Search query:', this.searchQuery);
    // Implement search logic here
  }

  clearSearch(): void {
    this.searchQuery = '';
    console.log('Search cleared');
  }
}
