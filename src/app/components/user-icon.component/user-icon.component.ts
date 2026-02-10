import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CryptoService } from '../../services/crypto.service';
declare var $: any;

@Component({
  selector: 'app-user-icon',
  imports: [CommonModule],
  templateUrl: './user-icon.component.html',
  styleUrl: './user-icon.component.css',
})
export class UserIcon {

  @Input() isConnected: boolean = false;
  @Input() dropDownVisible: boolean = false;
  encryptedUser: string = '';
  decryptedUser: any = null;
  @Input() isAdmin: string | null = null;

  constructor(private cryptoService: CryptoService) { }

  toggleDropDown() {
    this.dropDownVisible = !this.dropDownVisible;
  }

  openModal() {
    this.dropDownVisible = false;
    $("#connectionModal").modal("show");
  }

  logout() {
    this.encryptedUser = localStorage.getItem('connectedUser') || '';
    this.decryptedUser = this.cryptoService.decrypt(this.encryptedUser);
    localStorage.removeItem('connectedUser');
    this.isConnected = false;
    this.isAdmin = null;
    this.dropDownVisible = false;
    alert('✅ Déconnexion réussie.');
  }

  manageModal() {
    this.dropDownVisible = false;
    $("#manageModal").modal("show");
  }

  openOrders() {
    this.dropDownVisible = false;
    $("#ordersModal").modal("show");
  }
}
