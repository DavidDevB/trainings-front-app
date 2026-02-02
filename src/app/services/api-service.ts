import { Injectable } from '@angular/core';
import { Training } from '../models/training.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http:HttpClient) {}

  public getTrainings() {
    return this.http.get<Training[]>('http://localhost:3000/trainings');
  }
}
