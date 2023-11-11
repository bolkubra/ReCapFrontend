import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { ListResponseModel } from '../models/listResponseModel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl = "https://localhost:44388/api/"

  constructor(private httpClinet:HttpClient) { }

 
    getUsersById(email:string): Observable<any> {
      let newPath = this.apiUrl+"users/getbyid?id="+email
      return this.httpClinet.get<any>(newPath);
    }
   
    UpdateUser(data: any): Observable<any> {
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' }); // json formatta gönderiyoruz
      return this.httpClinet.post(this.apiUrl + 'users/update', data, { headers });
    }
}
