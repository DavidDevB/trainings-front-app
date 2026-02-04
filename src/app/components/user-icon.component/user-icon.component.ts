import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
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

  constructor() {}

  toggleDropDown() {
    this.dropDownVisible = !this.dropDownVisible;
  }

  openModal() {
    $("#connectionModal").modal("show");
  }
}
