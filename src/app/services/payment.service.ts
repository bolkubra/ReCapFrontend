import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  apiUrl = 'https://localhost:4200/api/payments/';

  constructor(private httpClient: HttpClient) {}

  postPayment(data : any): Observable<any> { // data gönderiyoruz
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' }); // json formatta gönderiyoruz
    return this.httpClient.post(this.apiUrl + "insert", data, { headers });
  }
}
