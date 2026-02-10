import { Injectable } from '@angular/core';
import { Training } from '../models/training.model';
import { HttpClient } from '@angular/common/http';
import { Order } from '../models/order.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http:HttpClient) {}

  public getTrainings() {
    return this.http.get<Training[]>('http://localhost:3000/trainings');
  }

  public getOneTraining(id: string) {
    return this.http.get<Training>(`http://localhost:3000/trainings/${id}`);
  }

  public getUsers() {
    return this.http.get<any[]>('http://localhost:3000/users');
  }

  public deleteTraining(id: string) {
    return this.http.delete(`http://localhost:3000/trainings/${id}`);
  }

  public addTraining(training: Training) {
    return this.http.post('http://localhost:3000/trainings', training);
  }

  public getOrders() {
    return this.http.get<any[]>('http://localhost:3000/orders');
  }

  public addOrder(order: Order) {
    return this.http.post('http://localhost:3000/orders', order);
  }
}
