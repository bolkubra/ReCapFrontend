import { Component, OnInit, TemplateRef } from '@angular/core';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brand.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { FormGroup } from '@angular/forms';



@Component({
  selector: 'app-brandlist',
  templateUrl: './brandlist.component.html',
  styleUrls: ['./brandlist.component.css'],
})
export class BrandlistComponent implements OnInit {
  brands: Brand[] = [];
  dataLoded = false;
  brandId: any;
  brandName: string;
  modalRef: BsModalRef;
  brandUpdateForm: FormGroup;
  formBuilder: any;
  template1: TemplateRef<any>;

  constructor(
    private BrandService: BrandService,
    private modalService: BsModalService,
    private toasterService: ToastrService
  ) { }

  openModal(template: TemplateRef<any>, id: number, name: string) {
    console.log(id);
    this.modalRef = this.modalService.show(template);
  }

  openModalUpdate(template: TemplateRef<any>, id: number, name: string) {
    // Tıklanan markanın bilgilerini form alanlarına atar
    this.brandId = id; // Bu, Brand ID metin alanını doldurur
    this.brandName = name; // Bu, Brand Name metin alanını doldurur

    this.modalRef = this.modalService.show(template);
  }



  ngOnInit(): void {
    this.getBrands();
  }

  getBrands() {
    this.BrandService.getBrands().subscribe((response) => {
      this.brands = response.data;
      this.dataLoded = true;
    });
  }





  postBrand() {
    var mytoastr = this.toasterService;
    const data = {
      BrandId: this.brandId,
      BrandName: this.brandName,
    };
    console.log(data);
    this.BrandService.postBrand(data).subscribe(
      (postresponse) => {
        console.log(postresponse);
        mytoastr.success('veri eklendi');
        this.getBrands();
      },
      (error) => {
        // Hata işlemleri
        console.log(error);
        mytoastr.error('Veri Eklenemedi', 'Dikkat');

      }
    );
  }

  deleteBrand(id: number) {
    var mytoastr = this.toasterService;
    const data = {
      BrandId: id,
      BrandName: this.brandName,
    };
    console.log(data);
    this.BrandService.deleteBrand(data).subscribe(
      (postresponse) => {
        console.log(postresponse);
        mytoastr.success('veri silindi');
        this.getBrands();
      },
      (error) => {
        // Hata işlemleri
        console.log(error);
        mytoastr.error(' işlem başarısız', 'Dikkat');

      }
    );
  }

  updateBrand() {
    var mytoastr = this.toasterService;
    const data = {
      BrandId: parseInt(this.brandId),
      BrandName: this.brandName,
     
    };
    console.log(data);

    this.BrandService.updateBrand(data).subscribe(
      (postresponse) => {
        console.log(postresponse);
        mytoastr.success('veri güncellendi');
        this.getBrands();
        this.modalRef.hide();
      },
      (error) => {
        // Hata işlemleri
        console.log(error);
        mytoastr.error('güncelleme işlemi başarısız', 'Dikkat');
      }
    );
  }
 
}
