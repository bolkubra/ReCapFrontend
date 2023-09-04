import { Component, OnInit } from '@angular/core';
import { Car } from 'src/app/models/car';
import {HttpClient} from '@angular/common/http';
import { CarResponseModel } from 'src/app/models/carResponseModel';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit{

cars : Car [] =[];
apiUrl = "https://localhost:44388/api/cars/getall"
carResponseModel : CarResponseModel={
  data : this.cars,
  messgae : " ",
  succes : true
};
constructor (private httpClinet:HttpClient) {}

ngOnInit():void{
  this.getCars();
}

getCars() {
  this.httpClinet.get<CarResponseModel>(this.apiUrl).subscribe((response) => {
    this.cars=response.data

  });
}


}
