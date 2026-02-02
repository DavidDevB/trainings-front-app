import { Component, Output } from '@angular/core';

@Component({
  selector: 'app-connection.component',
  imports: [],
  templateUrl: './connection.component.html',
  styleUrl: './connection.component.css',
})
export class ConnectionComponent {

  @Output() isConnected : boolean = false;

  constructor() {}

  onIsConnectedChange() {
    this.isConnected = !this.isConnected;
  }
}
