import { Component } from '@angular/core';
import { Customer } from 'src/app/models/customer';
import { CustomerResponseModel } from 'src/app/models/customerResponseModel';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent {
  customer : Customer [] =[];
 
  
  customerResponseModel : CustomerResponseModel={
    data : this.customer,
    messgae : " ",
    success : true
  };
  constructor (private CustomerService: CustomerService) {}
  
  ngOnInit():void{
    this.getCustomers(); 
  }
  
  getCustomers() {
    
    this.CustomerService.getCustomers().subscribe(response=>{
      this.customer=response.data
      });
    }
}
