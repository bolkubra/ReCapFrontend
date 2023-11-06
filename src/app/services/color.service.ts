import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CarResponseModel } from '../models/carResponseModel';
import { Observable } from 'rxjs';
import { colorResponseModel } from '../models/colorResponseModel';

@Injectable({
  providedIn: 'root'
})
export class ColorService {

  apiUrl = "https://localhost:44388/api/colors/"

  constructor(private httpClinet:HttpClient) { }

  getColors(): Observable<colorResponseModel> {
    return this.httpClinet.get<colorResponseModel>(this.apiUrl + 'getall');
  }
    postColor(data: any): Observable<any> {
      // data gönderiyoruz
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' }); // json formatta gönderiyoruz
      return this.httpClinet.post(this.apiUrl + 'add', data, { headers });
    }
  
    deleteColor(data: any): Observable<any> {
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' }); // json formatta gönderiyoruz
      return this.httpClinet.post(this.apiUrl + 'delete', data, { headers });
    }
  
    updateColor(data : any):Observable<any>{
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' }); // json formatta gönderiyoruz
      return this.httpClinet.put(this.apiUrl + 'update', data, { headers });
  }
  
}
