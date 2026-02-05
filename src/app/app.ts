import { Component, signal, afterNextRender } from '@angular/core';
import { RouterOutlet, RouterLink} from '@angular/router';
import { CartService } from './services/cart.service';
import { UserIcon } from "./components/user-icon.component/user-icon.component";
import { ConnectionComponent } from "./components/connection.component/connection.component";
import { FormsModule } from '@angular/forms';
import { ManageTrainings } from './components/manage-trainings.component/manage-trainings.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, UserIcon, FormsModule, ConnectionComponent, ManageTrainings],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('trainings-front-app');

  isConnected: boolean = false;
  dropDownVisible: boolean = false;
  cartItemCount: number = 0;
  isAdmin: boolean = false;

  constructor(public cartService: CartService) {
    afterNextRender(() => {
    if (typeof localStorage !== 'undefined') {
      const user = localStorage.getItem('connectedUser');
      this.isConnected = !!user; 
    }
    this.cartItemCount = this.cartService.getCartContent().length;
    });
  }

  onConnectionSuccess(connected: boolean) {
    this.isConnected = connected;
  }

  onDropDownToggle(visible: boolean) {
    this.dropDownVisible = visible;
  }

  onAdminStatusChange(isAdmin: boolean) {
    this.isAdmin = isAdmin;
  }
}
