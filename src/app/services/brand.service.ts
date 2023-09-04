import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { brandResponseModel } from '../models/brandResponseModel';

@Injectable({
  providedIn: 'root'
})
export class BrandService {
  apiUrl = "https://localhost:44388/api/brands/getall"

  constructor(private httpClinet:HttpClient) { }

  getBrands() : Observable<brandResponseModel>{
    return this.httpClinet.get<brandResponseModel>(this.apiUrl)
    }
}