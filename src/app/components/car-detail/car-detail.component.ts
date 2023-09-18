import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarDetail } from 'src/app/models/carDetail';
import { CarResponseModel } from 'src/app/models/carResponseModel';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {

cardetail : CarDetail [] =[];
currentCarDetail : CarDetail;
dataLoded = false;
  getCarsDetailsId: any;

constructor (private carService: CarService, private activedRouter:ActivatedRoute) {}
  ngOnInit(): void {
    this.activedRouter.params.subscribe((params) => {
      if (params['carDetailId']) {
        this.getCarsDetailsId(params['carDetailId']);
      }
    });
    
  }


}
