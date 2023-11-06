import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-car-add',
  templateUrl: './car-add.component.html',
  styleUrls: ['./car-add.component.css'],
})
export class CarAddComponent implements OnInit {
  brands: Brand[];
  colors: Color[];
  carAddForm: FormGroup;
 

  constructor(
    private carService: CarService,
    private brandService: BrandService,
    private colorService: ColorService,
    private formBuilder: FormBuilder,
    private toastrService : ToastrService
  ) {}

  ngOnInit(): void {
    this.brandList();
    this.colorList();
    this.createCarAddForm();
  }

  createCarAddForm(){
    this.carAddForm=this.formBuilder.group({
      brandId:["",Validators.required],
      colorId:["",Validators.required],
      modelYear:["",Validators.required],
      dailyPrice:["",Validators.required],
      description:["",Validators.required],
      carName:["",Validators.required],
    })
  }
  brandList(){
    this.brandService.getBrands().subscribe(response=>{
      this.brands = response.data;
    })
  }

  colorList(){
    this.colorService.getColors().subscribe(response=> {
      this.colors = response.data;
    })
  }

  addNewCar(){
    var mytoastr = this.toastrService;
    console.log(this.carAddForm)
    if(this.carAddForm.valid){
      let carModel = Object.assign({},this.carAddForm.value);
      console.log(carModel);
      this.carService.postCar(carModel).subscribe(response =>{
        mytoastr.success('başarılı');
      },(error) => {
        // Hata işlemleri
        console.log(error);
        mytoastr.error('ekleme işlemi başarısız', 'Dikkat');
      })
    }
    else{
      mytoastr.error(' başarısız', 'Dikkat');
    }
  }
}
