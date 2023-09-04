import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CarResponseModel } from '../models/carResponseModel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  apiUrl = "https://localhost:44388/api/cars/getall"

  constructor(private httpClinet:HttpClient) { }

  getCars() : Observable<CarResponseModel>{
    return this.httpClinet.get<CarResponseModel>(this.apiUrl)
    }
  }

