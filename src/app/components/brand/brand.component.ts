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
  currentBrand : Brand;
  dataLoded = false;
  filterText : "";
  
  brandResponseModel : brandResponseModel={
    data : this.brands,
    messgae : " ",
    success : true
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

    setCurrentBrand(brand:Brand){
      this.currentBrand=brand;
    }

  getCurrentBrandClass(brand:Brand){
    if(brand==this.currentBrand)
    {
      return "list-group-item active"
    }
    else{
      return "list-group-item"
    }
  }

  getAllBrandClass(){
    if(!this.currentBrand)
    {
      return "list-group-item active"
    }
    else{
      return "list-group-item"
    }
  }
  }
