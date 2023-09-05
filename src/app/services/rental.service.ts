import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { rentalResponseModel } from '../models/rentalResponseModel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RentalService {

  apiUrl = "https://localhost:44388/api/rentals/getall"

  constructor(private httpClinet:HttpClient) { }

  getRentals() : Observable<rentalResponseModel>{
    return this.httpClinet.get<rentalResponseModel>(this.apiUrl)
    }
  }
