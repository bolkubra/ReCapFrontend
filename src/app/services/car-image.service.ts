import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ListResponseModel } from '../models/listResponseModel';
import { CarImage } from '../models/carImage';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarImageService {

  apiUrl = "https://localhost:44388/api/"
  constructor(private httpClient:HttpClient) { }

  getCarImages() : Observable<ListResponseModel<CarImage>>{
    let newPath =this.apiUrl + "carImages/getall"
    return this.httpClient.get<ListResponseModel<CarImage>>(newPath)
    }

  getCarImagesByCarId(carId:number):Observable<ListResponseModel<CarImage>>{
    let newPath=this.apiUrl +"carImages/getbycarid?CarId=" +carId;
    console.log("aaaa")
    return this.httpClient.get<ListResponseModel<CarImage>>(newPath); 
    }
  
  getCarImagesById(imageId:number):Observable<ListResponseModel<CarImage>>{
    let newPath=this.apiUrl+"carImages/getbyimageid?imageId=" + imageId; //controllerde imageid 
    console.log(this.httpClient.get<ListResponseModel<CarImage>>(newPath))
    console.log(imageId)
    return this.httpClient.get<ListResponseModel<CarImage>>(newPath);
   
    }
}
