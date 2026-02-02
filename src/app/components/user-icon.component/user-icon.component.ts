import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-icon',
  imports: [CommonModule],
  templateUrl: './user-icon.component.html',
  styleUrl: './user-icon.component.css',
})
export class UserIcon {

  @Input() isConnected: boolean = false;
  modalVisible: boolean = false;

  constructor() {}

  

  toggleModal() {
    this.modalVisible = !this.modalVisible;
    console.log(this.isConnected);
    console.log(this.modalVisible);
  }
}
