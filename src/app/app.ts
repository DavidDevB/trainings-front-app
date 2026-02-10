import { Component, signal, afterNextRender, Input } from '@angular/core';
import { RouterOutlet, RouterLink} from '@angular/router';
import { CartService } from './services/cart.service';
import { UserIcon } from "./components/user-icon.component/user-icon.component";
import { ConnectionComponent } from "./components/connection.component/connection.component";
import { FormsModule } from '@angular/forms';
import { ManageTrainings } from './components/manage-trainings.component/manage-trainings.component';
import {MatButtonModule} from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { ThemeService } from './services/theme.service';
import { OrderComponent } from './components/order.component/order.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, UserIcon, FormsModule, ConnectionComponent, ManageTrainings, MatButtonModule, MatBadgeModule, OrderComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('trainings-front-app');

  isConnected: boolean = false;
  dropDownVisible: boolean = false;
  cartItemCount: number = 0;
  isAdmin: string | null = null;

  constructor(public cartService: CartService, private themeService: ThemeService) {
    afterNextRender(() => {
    if (typeof localStorage !== 'undefined') {
      const user = localStorage.getItem('connectedUser');
      this.isConnected = !!user; 
    }
    this.cartItemCount = this.cartService.getCartContent().length;
    });
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }

  get theme() {
    return this.themeService.theme();
  }

  onConnectionSuccess(connected: boolean) {
    this.isConnected = connected;
  }

  onDropDownToggle(visible: boolean) {
    this.dropDownVisible = visible;
  }

  onAdminStatusChange(isAdmin: string | null) {
    this.isAdmin = isAdmin;
  }
}
