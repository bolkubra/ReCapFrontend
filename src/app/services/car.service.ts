import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CarResponseModel } from '../models/carResponseModel';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Car } from '../models/car';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  apiUrl = "https://localhost:44388/api/cars/getcardetails"

  constructor(private httpClinet:HttpClient) { }

  getCars() : Observable<CarResponseModel>{
    
    return this.httpClinet.get<CarResponseModel>(this.apiUrl)
    }

    /*getCarsByBrand(brandId: number): Observable<ListResponseModel<Car>> {
      let newPath = this.apiUrl + 'cars/getcarsbybrandid?id=';
      return this.httpClinet.get<ListResponseModel<Car>>(newPath + brandId);
    }
  
    getCarsByColor(colorId: number):Observable<ListResponseModel<Car>>{
  let newPath = this.apiUrl + 'cars/getcarsbycolorid?id=';
  return this.httpClinet.get<ListResponseModel<Car>>(newPath+colorId);
  }*/


}

