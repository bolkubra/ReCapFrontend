import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { brandResponseModel } from '../models/brandResponseModel';

@Injectable({
  providedIn: 'root',
})
export class BrandService {
  apiUrl = 'https://localhost:44388/api/brands/';

  constructor(private httpClinet: HttpClient) {}

  getBrands(): Observable<brandResponseModel> {
    return this.httpClinet.get<brandResponseModel>(this.apiUrl + 'getall');
  }

  postBrand(data: any): Observable<any> {
    // data gönderiyoruz
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' }); // json formatta gönderiyoruz
    return this.httpClinet.post(this.apiUrl + 'insert', data, { headers });
  }

  deleteBrand(data: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' }); // json formatta gönderiyoruz
    return this.httpClinet.post(this.apiUrl + 'delete', data, { headers });
  }
}
