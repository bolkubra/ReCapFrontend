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
import { NgForm } from '@angular/forms';
import { PaymentService } from 'src/app/services/payment.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnInit {
  carDetails: CarDetail[] = [];
  creditnumber: string;
  creditdate: string;
  cvv: string;
  rentDate: any;
  returnDate: any;
  carId: any;
  dayDifferents: number;

  constructor(
    private carService: CarService,
    private activedRouter: ActivatedRoute,
    private toastrService: ToastrService,
    private rentalService: RentalService,
    private paymentService: PaymentService
  ) {}

  ngOnInit(): void {
    this.activedRouter.params.subscribe((params) => {
      if (params['id']) {
        this.carId = params['id'];
        this.rentDate = params['rentdate'];
        this.returnDate = params['returndate'];
        this.getCarDetail(params['id']);
      }
    });
  }
  getCarDetail(carId: number) {
    this.carService.getCarsDetailsId(carId).subscribe((response) => {
      this.carDetails = response.data;
    });
  }
  sentData(creditnumber: string, creditdate: string, cvv: string) {
    var mytoastr = this.toastrService;

    this.calculateDateDifference();
    this.rentalService
      .getIsSuitable(this.carId, this.rentDate, this.returnDate)
      .subscribe(
        (response) => {
          console.log(response);
          if (response.success) {
            const formattedRentDate = new DatePipe('en-US').transform(
              this.rentDate,
              'yyyy-MM-dd'
            );
            const formattedReturnDate = new DatePipe('en-US').transform(
              this.returnDate,
              'yyyy-MM-dd'
            );
            const data = {
              // Göndermek istediğimiz veriler

              CarId: parseInt(this.carId),
              CustomerId: 5003,
              RentStartDate: formattedRentDate,
              RentEndDate: formattedReturnDate,
              ReturnDate: formattedReturnDate,
            };
            console.log(data);
            this.rentalService.postRentals(data).subscribe(
              (postresponse) => {
                const paymentdata = {
                  CustomerId: 5003,
                  CreditCardNumber: this.creditnumber,
                  CreditCardDate: this.creditdate,
                  CreditCardCvv: this.cvv,
                  CarId: parseInt(this.carId),
                  RentalId: 1,
                  Price: this.carDetails[0].dailyPrice,
                };
                console.log(paymentdata);
                this.paymentService.postPayment(paymentdata).subscribe(
                  (paymentResponse) => {
                    mytoastr.success('Başarılı', 'Başarılı');
                    console.log(paymentResponse);
                  },
                  (error) => {
                    // Hata işlemleri
                    console.log(error);
                    mytoastr.error('Kiralamaya uygun değil:', 'Dikkat');
                  }
                );
              },
              (error) => {
                // Hata işlemleri
                console.log(error);
                mytoastr.error('Kiralamaya uygun değil:', 'Dikkat');
              }
            );
          } else {
            console.log('hata');
          }
        },
        (error) => {
          // Hata işlemleri
          console.log(error);
          mytoastr.error('Kiralamaya uygun değil:', 'Dikkat');
        }
      );
  }

  calculateDateDifference() {
    const dateObject = new Date(this.returnDate);
    const dateObject2 = new Date(this.rentDate);
    const timeDifference = dateObject.getTime() - dateObject2.getTime();
    this.dayDifferents = Math.floor(timeDifference / (1000 * 3600 * 24));
  }
}
