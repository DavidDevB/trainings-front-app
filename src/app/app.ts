import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterLink, Router} from '@angular/router';
import { CartService } from './services/cart.service';
import {SearchbarComponent } from './components/searchbar.component/searchbar.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, SearchbarComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('trainings-front-app');

  constructor(public cartService: CartService, private router: Router) {}

  get currentRoute(): string {
    return this.router.url;
  }


}
