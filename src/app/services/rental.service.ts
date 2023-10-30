import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { rentalResponseModel } from '../models/rentalResponseModel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RentalService {

  apiUrl = "https://localhost:44388/api/rentals/"

  constructor(private httpClinet:HttpClient) { }

  getRentals() : Observable<rentalResponseModel>{
    return this.httpClinet.get<rentalResponseModel>(this.apiUrl+"getall")
    }

  getIsSuitable(rentId : number, startDate : Date, endDate : Date) : Observable<rentalResponseModel>{
    return this.httpClinet.get<rentalResponseModel>(this.apiUrl+ "getissuitable?rentId="+rentId+"&startDate="+startDate+"&endDate="+endDate
    )
    }
  }

  
