import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarDetail } from 'src/app/models/carDetail';
import { CarImage } from 'src/app/models/carImage';
import { CarResponseModel } from 'src/app/models/carResponseModel';
import { CarImageService } from 'src/app/services/car-image.service';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {

carDetails : CarDetail [] =[];
carImages : CarImage [] = [];
currentCarDetail : CarDetail;
dataLoded = false;
getCarsDetailsId: any;
imageUrl = 'https://localhost:4200/Uploads/Images/';
constructor (private carService: CarService,
  private activedRouter:ActivatedRoute ,
  private CarImageService : CarImageService) {}


ngOnInit(): void {
  this.activedRouter.params.subscribe(params=>{
    if(params["id"]){
      this.getCarDetail(params["id"]);
      this.getCarImagesById(params["id"]);
      
    }

    
  })
}

getCarDetail(carId: number) {
  this.carService.getCarsDetailsId(carId).subscribe(response => {
    this.carDetails = response.data;
    this.dataLoded = true;
    console.log(response)
  });
}
getCarImages(){
  this.CarImageService.getCarImages().subscribe(response=>{
    this.carImages=response.data;
    this.dataLoded=true;
   
  })

}

getCarImagesByCarId(carId:number){
  this.CarImageService.getCarImagesByCarId(carId).subscribe(response=>{
    this.carImages=response.data;
    this.dataLoded=true;
    
  })
}

getCarImagesById(imageId:number){
  this.CarImageService.getCarImagesById(imageId).subscribe(response=>{
    this.carImages=response.data;
    this.dataLoded=true;
    console.log(response.data)
    
  })
}

getCarImage(cardetail : CarDetail) {
  if (cardetail.carImagePath == null) {
   let path = this.imageUrl + 'default.jpg';
    return path;
  } else if (cardetail.carImagePath.length > 1 ) {
    let path = this.imageUrl + cardetail.carImagePath[1]; 
    return path;
  } else {
    let path = this.imageUrl + cardetail.carImagePath;
    return path;
  }
}

}
