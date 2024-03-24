import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { CarDetail } from '../models/carDetail';


@Injectable({
  providedIn: 'root'
})
export class CarDetailService {
  apiUrl='https://localhost:4200/api/'

  constructor(private httpClient:HttpClient) { 

  }
 getCarDetails():Observable<ListResponseModel<CarDetail>>{
  let newPath = this.apiUrl +"Cars/getcardetails"
  return this.httpClient.get<ListResponseModel<CarDetail>>(newPath)
 }
 getCarDetailByCarId(carId:number):Observable<ListResponseModel<CarDetail>>{
  let newPath = this.apiUrl + "Cars/getcardetailsbycarid?carId=" + carId
  return this.httpClient.get<ListResponseModel<CarDetail>>(newPath)
 }
}