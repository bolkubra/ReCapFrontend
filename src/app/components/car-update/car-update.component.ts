import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { CarDetail } from 'src/app/models/carDetail';
import { CarImage } from 'src/app/models/carImage';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarImageService } from 'src/app/services/car-image.service';
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
  imageAddForm: FormGroup;
  carDetails: CarDetail[] = [];
  carImages: CarImage[] = [];

  imageUrl = 'https://localhost:44388/Uploads/Images/';

  constructor(
    private carService: CarService,
    private brandService: BrandService,
    private colorService: ColorService,
    private toastrService: ToastrService,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private carImageService: CarImageService
  ) {}

  ngOnInit(): void {
    this.colorList();
    this.brandList();
    this.createCarUpdateForm();
    this.createImageAddForm();
    this.activatedRoute.params.subscribe((params) => {
      if (params['carId']) {
        this.getCarDetail(params['carId']);
        this.getCarImagesById(params['carId']);
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

  createImageAddForm() {
    this.imageAddForm = this.formBuilder.group({
      file: [null],
    });
  }
  uploadFile(event: any) {
    const carImageInput = event.target as HTMLInputElement;
    const carImage = carImageInput.files?.[0];

    if (carImage) {
      this.imageAddForm.patchValue({
        file: carImage,
      });
      this.imageAddForm.get('file')!.updateValueAndValidity(); // ! işareti null çek yapıyor
    } else {
      // Handle the case where files are null (e.g., user canceled file selection)
      console.error('No file selected.');
    }
  }
  addImageCar() {
    if (this.imageAddForm.valid) {
      var formData: any = new FormData();
      formData.append('file', this.imageAddForm.get('file')!.value);
      formData.append('CarId', this.carDetails[0].carId);
      this.carImageService.upload(formData).subscribe(
        (response) => {
          this.toastrService.success(response.message);
        },
        (error) => {
          this.toastrService.error(error.error.message);
        }
      );
    } else {
      this.toastrService.error('Form Bilgileriniz Eksik');
    }
  }
  getCarDetail(carId: number) {
    this.carService.getCarsDetailsId(carId).subscribe((response) => {
      this.carDetails = response.data;
      const dataFromParent = {
        carId: this.carDetails[0].carId,
        carName: this.carDetails[0].carName,
        brandName: this.carDetails[0].brandName,
        colorName: this.carDetails[0].colorName,
        dailyPrice: this.carDetails[0].dailyPrice,
        modelYear: this.carDetails[0].modelYear,
        description: this.carDetails[0].description,
        brandId: this.brands.filter(
          (item) => item.brandName === this.carDetails[0].brandName
        )[0].brandId, //isimden id bulma
        colorId: this.colors.filter(
          (item) => item.colorName === this.carDetails[0].colorName
        )[0].colorId,
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

  getCarImagesById(imageId: number) {
    this.carImageService.getCarImagesById(imageId).subscribe((response) => {
      this.carImages = response.data;
    });
  }
  getCarImage(cardetail: any) {
    let path = this.imageUrl + cardetail.imagePath;
    return path;
  }

  deleteImage(image: any) {
    var mytoastr = this.toastrService;

    this.carImageService.deleteImage(image).subscribe((response)=>{
      this.getCarImagesById(this.carDetails[0].carId);
      mytoastr.success('Başarı ile silindi');
    }, (error) => {
      // Hata işlemleri
      console.log(error);
      mytoastr.error('Silme başarısız');
    });
  }
}
