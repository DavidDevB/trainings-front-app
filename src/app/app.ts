import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterLink} from '@angular/router';
import { CartService } from './services/cart.service';
import { UserIcon } from "./components/user-icon.component/user-icon.component";
import { ConnectionComponent } from "./components/connection.component/connection.component";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, UserIcon, FormsModule, ConnectionComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('trainings-front-app');

  isConnected: boolean = false;

  constructor(public cartService: CartService) {}
}
