import { Component } from '@angular/core';
import { Brand } from 'src/app/models/brand';
import { brandResponseModel } from 'src/app/models/brandResponseModel';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css']
})
export class BrandComponent {
  brands : Brand [] =[];
  dataLoded = false;
  
  brandResponseModel : brandResponseModel={
    data : this.brands,
    messgae : " ",
    succes : true
  };
  constructor (private BrandService: BrandService) {}
  
  ngOnInit():void{
    this.getBrands(); // yazılmazsa ürünler listelenmez
  }
  
  getBrands() {
    
    this.BrandService.getBrands().subscribe(response=>{
      this.brands=response.data
      this.dataLoded = true;
      });
    }
  }
