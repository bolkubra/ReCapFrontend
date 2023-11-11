import { Component, OnInit } from '@angular/core';
import { Car } from 'src/app/models/car';
import {HttpClient} from '@angular/common/http';
import { CarResponseModel } from 'src/app/models/carResponseModel';
import { CarService } from 'src/app/services/car.service';
import { ActivatedRoute } from '@angular/router';
import { BrandService } from 'src/app/services/brand.service';
import { ColorService } from 'src/app/services/color.service';
import { Brand } from 'src/app/models/brand';
import { Color } from 'src/app/models/color';
import { CarDetail } from 'src/app/models/carDetail';
import { CarDetailService } from 'src/app/services/car-detail.service';
import { CarImage } from 'src/app/models/carImage';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit{

cars: Car[] = [];
brands:Brand[] = [];
colors:Color[] = [];
carDetails:CarDetail[]=[];
carImages : CarImage [] = [];
currentCar : Car;
dataLoded = false;
filterText = "";
brandFilter : number;
colorFilter : number;
IsUserLogin : boolean;


carResponseModel : CarResponseModel={
  data : this.cars,
  messgae : " ",
  success : true
};
constructor (private carService: CarService,
  private brandService: BrandService,
  private colorService: ColorService,
  private activedRouter:ActivatedRoute,
  private toastrService : ToastrService,
  private authService : AuthService,
  private localStorageService : LocalStorageService) {}

ngOnInit():void{
  this.activedRouter.params.subscribe(params=>{
    this.getBrands(); // bunlar yazılmazsa select option içerisi boş gelir
    this.getColors();
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
    this.IsUserLogin=this.authService.isAuthenticated();
   
   
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
getCarsByBrandAndColor (brandId : number , colorId : number){
  this.carService.getCarsByBrandAndColor(brandId,colorId).subscribe(response=>{
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

    deleteCar(id: number) {
      var mytoastr = this.toastrService;
      const data = {
        CarId: id,
      };
     
      this.carService.deleteCar(data).subscribe(
        (postresponse) => {
          
          mytoastr.success('veri silindi');
          this.getCars();
        },
        (error) => {
          // Hata işlemleri
          console.log(error);
          mytoastr.error(' işlem başarısız', 'Dikkat');
  
        }
      );
    }
    findImage(image : string){
      
      return "https://localhost:44388/Uploads/Images/" + image;
    }
  
}


