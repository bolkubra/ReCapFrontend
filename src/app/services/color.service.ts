import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CarResponseModel } from '../models/carResponseModel';
import { Observable } from 'rxjs';
import { colorResponseModel } from '../models/colorResponseModel';

@Injectable({
  providedIn: 'root'
})
export class ColorService {

  apiUrl = "https://localhost:44388/api/colors/getall"

  constructor(private httpClinet:HttpClient) { }

  getColors() : Observable<colorResponseModel>{
    return this.httpClinet.get<colorResponseModel>(this.apiUrl)
    }

  
}
