import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarDetail } from 'src/app/models/carDetail';
import { CarImage } from 'src/app/models/carImage';
import { CarResponseModel } from 'src/app/models/carResponseModel';
import { CarImageService } from 'src/app/services/car-image.service';
import { CarService } from 'src/app/services/car.service';
import { CarouselConfig } from 'ngx-bootstrap/carousel';
import { RentalService } from 'src/app/services/rental.service';
import { DatePipe } from '@angular/common';

declare var $: any;

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  providers: [
    {
      provide: CarouselConfig,
      useValue: { interval: 1500, noPause: false, showIndicators: true },
    },
  ],
  styleUrls: ['./car-detail.component.css'],
})
export class CarDetailComponent implements OnInit {
  carDetails: CarDetail[] = [];
  carImages: CarImage[] = [];
  currentCarDetail: CarDetail;
  dataLoded = false;
  getCarsDetailsId: any;
  rentDate: Date = new Date();
  returnDate: Date = new Date();
  formattedRentDate = new DatePipe('en-US').transform(this.rentDate, 'yyyy-MM-dd');
  formattedReturnDate = new DatePipe('en-US').transform(this.returnDate, 'yyyy-MM-dd');

  imageUrl = 'https://localhost:44388/Uploads/Images/';

  constructor(
    private carService: CarService,
    private activedRouter: ActivatedRoute,
    private CarImageService: CarImageService,
    private RentalService: RentalService
  ) {}

  noWrapSlides = false;
  ngOnInit(): void {
    this.activedRouter.params.subscribe((params) => {
      if (params['id']) {
        this.getCarDetail(params['id']);
        this.getCarImagesById(params['id']);
      }
    });
  }

  getCarDetail(carId: number) {
    this.carService.getCarsDetailsId(carId).subscribe((response) => {
      this.carDetails = response.data;
      this.dataLoded = true;
    
    });
  }
  getCarImages() {
    this.CarImageService.getCarImages().subscribe((response) => {
      this.carImages = response.data;
      this.dataLoded = true;
    });
  }

  getCarImagesByCarId(carId: number) {
    this.CarImageService.getCarImagesByCarId(carId).subscribe((response) => {
      this.carImages = response.data;
      this.dataLoded = true;
    });
  }

  getCarImagesById(imageId: number) {
    this.CarImageService.getCarImagesById(imageId).subscribe((response) => {
      this.carImages = response.data;
      this.dataLoded = true;
     
    });
  }

  getCarImage(cardetail: any) {
    

    let path = this.imageUrl + cardetail.imagePath;
    return path;
  }

  getIsSuitable (rentId : number, formattedRentDate : any, formattedReturnDate : any){
    console.log(rentId);
    console.log(formattedRentDate);
    console.log(formattedReturnDate);
    this.RentalService.getIsSuitable(rentId, formattedRentDate, formattedReturnDate).subscribe((response)=>{
    console.log(response.data);
    })
  }
}
