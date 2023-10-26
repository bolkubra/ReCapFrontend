import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CarResponseModel } from '../models/carResponseModel';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Car } from '../models/car';
import { CarDetail } from '../models/carDetail';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  apiUrl = "https://localhost:44388/api/"

  constructor(private httpClinet:HttpClient) { }

    getCars() : Observable<CarResponseModel>{
    let newPath =this.apiUrl + "cars/getcardetails"
    return this.httpClinet.get<CarResponseModel>(newPath)
    }
    getCarsByBrand(brandId: number): Observable<ListResponseModel<Car>> {
      let newPath = this.apiUrl + "cars/getbybrandid?brandId="+brandId
      return this.httpClinet.get<ListResponseModel<Car>>(newPath);
    }
    getCarsByColor(colordId: number): Observable<ListResponseModel<Car>> {
      let newPath = this.apiUrl + "cars/getbycolorid?colorId="+colordId
      return this.httpClinet.get<ListResponseModel<Car>>(newPath);
    }
    getCarsById(carId:number): Observable<ListResponseModel<Car>> {
      let newPath = this.apiUrl+"cars/getbyid?id="+carId
      return this.httpClinet.get<ListResponseModel<Car>>(newPath);
    }
    getCarsDetailsId(carDetailId:number):Observable<ListResponseModel<CarDetail>>{
      let newPath =this.apiUrl+"cars/getcardetailsbycarid?carId="+carDetailId
      return this.httpClinet.get<ListResponseModel<CarDetail>>(newPath);
    }
    getCarsByBrandAndColor(brandId : number , colorId : number):Observable<ListResponseModel<CarDetail>>{
      let newPath =this.apiUrl+"cars/getcarsbybrandandcolor?brandId=" + brandId + "&colorId=" + colorId;
      return this.httpClinet.get<ListResponseModel<CarDetail>>(newPath);
    }
}