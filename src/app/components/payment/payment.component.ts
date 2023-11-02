import { Component, OnInit } from '@angular/core';
import { Car } from 'src/app/models/car';
import { HttpClient } from '@angular/common/http';
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
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnInit {
  carDetails: CarDetail[] = [];

  constructor(
    private carService: CarService,
    private activedRouter: ActivatedRoute,
    private toastrService : ToastrService,
    private rentalService : RentalService
  ) {}

  ngOnInit(): void {
    this.activedRouter.params.subscribe((params) => {
      if (params['id']) {
        console.log(params['id']);
      }
    });
  }

  getIsSuitable(
    rentId: number,
    formattedRentDate: any,
    formattedReturnDate: any
  ) {
    var mytoastr = this.toastrService;

    this.rentalService.getIsSuitable(
      this.carDetails[0].carId,
      formattedRentDate,
      formattedReturnDate
    ).subscribe(
      (response) => {
        if (response.success) {
          const data = {
            // Göndermek istediğimiz veriler
            CarId: this.carDetails[0].carId,
            CustomerId: 5003,
            RentStartDate: formattedRentDate,
            RentEndDate: formattedReturnDate,
            ReturnDate: formattedReturnDate,
          };
          this.rentalService.postRentals(data).subscribe((postresponse) => {
            mytoastr.success('Başarılı', 'Başarılı');
          });
        }
      },
      (error) => {
        // Hata işlemleri
        mytoastr.error('Kiralamaya uygun değil:', 'Dikkat');
      }
    );
  }
}
