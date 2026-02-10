import { Component, OnInit } from '@angular/core';
import { DatePipe, CurrencyPipe } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { Training } from '../../models/training.model';

@Component({
  selector: 'app-order',
  imports: [DatePipe, CurrencyPipe],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css',
})
export class OrderComponent implements OnInit {

  orders: any[] = [];
  trainings: Training[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.apiService.getTrainings().subscribe((trainings: Training[]) => {
      this.trainings = trainings;
    });
    this.loadOrders();
  }

  loadOrders() {
    this.apiService.getOrders().subscribe((data: any[]) => {
      this.orders = data.map(order => ({
        id: order.id,
        userId: order.userId,
        trainings: order.trainings,
        totalPrice: order.totalPrice,
        orderDate: new Date(order.orderDate)
      }));
    });
  }

  getOneTraining(id: string): Training | undefined{
    return this.trainings.find(training => training.id === id);
  }
}
