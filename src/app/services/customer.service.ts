import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CustomerResponseModel } from '../models/customerResponseModel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  apiUrl = "https://localhost:44388/api/customer/getall"

  constructor(private httpClinet:HttpClient) { }

  getCustomers() : Observable<CustomerResponseModel>{
    return this.httpClinet.get<CustomerResponseModel>(this.apiUrl)
    }
  }
