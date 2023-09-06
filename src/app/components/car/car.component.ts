import { Component, OnInit } from '@angular/core';
import { Car } from 'src/app/models/car';
import {HttpClient} from '@angular/common/http';
import { CarResponseModel } from 'src/app/models/carResponseModel';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit{

cars : Car [] =[];
dataLoded = false;

carResponseModel : CarResponseModel={
  data : this.cars,
  messgae : " ",
  succes : true
};
constructor (private carService: CarService) {}

ngOnInit():void{
  this.getCars(); // yazılmazsa ürünler listelenmez
}

getCars() {
  this.carService.getCars().subscribe(response=>{
    this.cars=response.data
    this.dataLoded = true;
    });
  }

  getCarsByBrand(brandId: number) {
    this.carService.getCarsByBrand(brandId).subscribe((response) => {
      this.cars = response.data;
      
    });
  }

  getCarsByColor(colorId: number) {
    this.carService.getCarsByColor(colorId).subscribe((response) => {
      this.cars = response.data;
      
    });
  }
}
