/*import { Component, OnInit } from '@angular/core';
import { Car } from 'src/app/models/car';
import {HttpClient} from '@angular/common/http';
import { CarResponseModel } from 'src/app/models/carResponseModel';
import { CarService } from 'src/app/services/car.service';
import { ActivatedRoute } from '@angular/router';
import { BrandService } from 'src/app/services/brand.service';
import { ColorService } from 'src/app/services/color.service';
import { Brand } from 'src/app/models/brand';
import { Color } from 'src/app/models/color';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit{

cars : Car [] = [];
brands:Brand[] = [];
colors:Color[] = [];
currentCar : Car;
dataLoded = false;
filterText = "";
brandFilter : number;
colorFilter : number;

carResponseModel : CarResponseModel={
  data : this.cars,
  messgae : " ",
  succes : true
};
constructor (private carService: CarService,
  private brandService: BrandService,
  private colorService: ColorService,
  private activedRouter:ActivatedRoute) {}

ngOnInit():void{
  this.activedRouter.params.subscribe(params=>{
    if(params["brandId"])
    {
      this.getCarsByBrand(params["brandId"])
    }
    else if (params["colorId"]){
      this.getCarsByColor(params["colorId"])
    }
    else{
      this.getCars();
    }
  })
}

getCars() {
  this.carService.getCars().subscribe(response=>{
    this.cars=response.data
    this.dataLoded = true;
    });
  }

getBrands() {
    this.brandService.getBrands().subscribe((response) => {
      this.brands = response.data;
      this.dataLoded = true;

    });
  }

getColors() {
    this.colorService.getColors().subscribe((response) => {
      this.colors = response.data;
      this.dataLoded=true;
    });
  }

getCarsByBrand(brandId : number) {
    this.carService.getCarsByBrand(brandId).subscribe(response=>{
      this.cars=response.data
      this.dataLoded = true;
      });
    }

getCarsByColor(colorId : number) {
    this.carService.getCarsByColor(colorId).subscribe(response=>{
        this.cars=response.data
        this.dataLoded = true;
        });
      }

      setCurrentCar(car:Car){
        this.currentCar=car;
      }
  
    getCurrentCarClass(car:Car){
      if(car==this.currentCar)
      {
        return "list-group-item active"
      }
      else{
        return "list-group-item"
      }
    }
  
    getAllCarClass(){
      if(!this.currentCar)
      {
        return "list-group-item active"
      }
      else{
        return "list-group-item"
      }
    }
  
}*/


import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Brand } from 'src/app/models/brand';
import { Car } from 'src/app/models/car';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';
import { CarDetail } from 'src/app/models/carDetail';



@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css'],
})
export class CarComponent implements OnInit {
  apiUrl = 'https://localhost:7216/api/cars/getall';
  cars: Car[] = [];
  carDetails:CarDetail[]=[];
  brands:Brand[]=[];
  colors:Color[]=[];
  dataLoded = false;
  filterText="";
  brandFilter:number;
  colorFilter:number;
  currentCar : Car;
  
  constructor(
    private carService: CarService,
    private activatedRoute:ActivatedRoute,
    private brandService:BrandService,
    private colorService:ColorService,
   
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if(params["id"]){
        this.getCarsByBrand(params["id"]);
        this.getCarsByColor(params["id"]);
        
      }
      else{
        this.getCars();
        this.getBrands();
        this.getColors();
      }
    })
  }

  getCars() {
    this.carService.getCars().subscribe((response) => {
      this.cars=response.data
      this.dataLoded = true;
    });
  }

  getBrands(){
    this.brandService.getBrands().subscribe((response)=>{
      this.brands=response.data;
      this.dataLoded=true;
    })
  }

  getColors(){
    this.colorService.getColors().subscribe((response)=>{
      this.colors=response.data;
      this.dataLoded=true;
    })
  }



  getCarsByBrand(id:number){
    this.carService.getCarsByBrand(id).subscribe(response=>{
      this.cars=response.data;
      this.dataLoded=true;
    })
  }

  getCarsByColor(id:number){
    this.carService.getCarsByColor(id).subscribe(response=>{
      this.cars=response.data;
      this.dataLoded=true;
    })
  }

  
  setCurrentCar(car:Car){
    this.currentCar=car;
  }
  getCurrentCarClass(car:Car){
    if(car==this.currentCar)
    {
      return "list-group-item active"
    }
    else{
      return "list-group-item"
    }
    

   


  

  
  }
}
  
