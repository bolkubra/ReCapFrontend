import { Component, OnInit, TemplateRef } from '@angular/core';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brand.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-brandlist',
  templateUrl: './brandlist.component.html',
  styleUrls: ['./brandlist.component.css'],
})
export class BrandlistComponent implements OnInit {
  brands: Brand[] = [];
  dataLoded = false;
  brandId: number;
  brandName: string;
  modalRef: BsModalRef;

  constructor(
    private BrandService: BrandService,
    private modalService: BsModalService,
    private toasterService: ToastrService
  ) {}

  openModal(template: TemplateRef<any>, id: number, name: string) {
    console.log(id);
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
        mytoastr.error('güncellenme işlemi başarısız', 'Dikkat');

      }
    );
  }

  deleteBrand(id : number){
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
}
