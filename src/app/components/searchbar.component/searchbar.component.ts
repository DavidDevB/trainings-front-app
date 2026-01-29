import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TrainingComponent } from '../trainings.component/trainings.component';
import { Training } from '../../models/training.model';
import { CartService } from '../../services/cart.service';

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

  filterTrainings(trainings: Training[], query: string): Training[] {
    return trainings.filter(training =>
      training.name.toLowerCase().includes(query.toLowerCase()) ||
      training.description.toLowerCase().includes(query.toLowerCase())
    ) || [];
  }

}
