import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { CarDetail } from 'src/app/models/carDetail';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-car-update',
  templateUrl: './car-update.component.html',
  styleUrls: ['./car-update.component.css'],
})
export class CarUpdateComponent implements OnInit {
  brands: Brand[];
  colors: Color[];
  carUpdateForm: FormGroup;
  carDetails: CarDetail[] = []; 

  constructor(
    private carService: CarService,
    private brandService: BrandService,
    private colorService: ColorService,
    private toastrService: ToastrService,
    private formBuilder : FormBuilder,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.colorList();
    this.brandList();
    this.createCarUpdateForm();
    this.activatedRoute.params.subscribe(params => {
      if (params['carId']) {
        this.getCarDetail(params['carId']);
      }
    });
  }
  createCarUpdateForm() {
    this.carUpdateForm = this.formBuilder.group({
      carId: ['', Validators.required],
      brandId: ['', Validators.required],
      colorId: ['', Validators.required],
      modelYear: ['', Validators.required],
      dailyPrice: ['', Validators.required],
      description: ['', Validators.required],
      carName: ['', Validators.required],
    });
  }

  getCarDetail(carId: number) {
    this.carService.getCarsDetailsId(carId).subscribe((response) => {
      this.carDetails = response.data;
      const dataFromParent = {
        carId:this.carDetails[0].carId,
        carName:this.carDetails[0].carName,
        brandName:this.carDetails[0].brandName,
        colorName:this.carDetails[0].colorName,
        dailyPrice:this.carDetails[0].dailyPrice,
        modelYear:this.carDetails[0].modelYear,
        description:this.carDetails[0].description,
        brandId : this.brands.filter(item => item.brandName === this.carDetails[0].brandName)[0].brandId, //isimden id bulma
        colorId : this.colors.filter(item => item.colorName === this.carDetails[0].colorName)[0].colorId,
       
      };
  
      // Forma verileri doldurun
      this.carUpdateForm.patchValue(dataFromParent);
    

    });
  }
  brandList() {
    this.brandService.getBrands().subscribe((response) => {
      this.brands = response.data;
     
    });
  }

  colorList() {
    this.colorService.getColors().subscribe((response) => {
      this.colors = response.data;
    });
  }

  addUpdateCar() {
    var mytoastr = this.toastrService;
    console.log(this.carUpdateForm);
    if (this.carUpdateForm.valid) {
      let carModel = Object.assign({}, this.carUpdateForm.value);
      console.log(carModel);
      this.carService.UpdateCar(carModel).subscribe(
        (response) => {
          mytoastr.success('başarılı');
        },
        (error) => {
          // Hata işlemleri
          console.log(error);
          mytoastr.error('ekleme işlemi başarısız', 'Dikkat');
        }
      );
    } else {
      mytoastr.error(' başarısız', 'Dikkat');
    }
  }
}
