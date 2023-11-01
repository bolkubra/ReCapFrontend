import { Component } from '@angular/core';
import { Rental } from 'src/app/models/rental';
import { rentalResponseModel } from 'src/app/models/rentalResponseModel';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.css']
})
export class RentalComponent {
 
    rentals : Rental[] =[];
    
    rentalResponseModel : rentalResponseModel={
      data : this.rentals,
      messgae : " ",
      success : true
    };
    constructor (private RentalServie : RentalService) {}
    
    ngOnInit():void{
      this.getRentals(); 
    }
    
    getRentals() {
      
      this.RentalServie.getRentals().subscribe(response=>{
        this.rentals=response.data
        
        });
      }

}
