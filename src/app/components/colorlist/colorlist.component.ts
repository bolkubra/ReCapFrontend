import { Component, OnInit, TemplateRef } from '@angular/core';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brand.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { FormGroup } from '@angular/forms';
import { Color } from 'src/app/models/color';
import { ColorService } from 'src/app/services/color.service';



@Component({
  selector: 'app-brandlist',
  templateUrl: './colorlist.component.html',
  styleUrls: ['./colorlist.component.css'],
})
export class ColorlistComponent implements OnInit {
  colors: Color[] = [];
  dataLoded = false;
  colorId: any;
  colorName: string;
  modalRef: BsModalRef;
  brandUpdateForm: FormGroup;
  formBuilder: any;
  template1: TemplateRef<any>;

  constructor(
    private colorService : ColorService,
    private modalService: BsModalService,
    private toasterService: ToastrService
  ) { }

  openModal(template: TemplateRef<any>, id: number, name: string) {
    console.log(id);
    this.modalRef = this.modalService.show(template);
  }

  openModalUpdate(template: TemplateRef<any>, id: number, name: string) {
    // Tıklanan markanın bilgilerini form alanlarına atar
    this.colorId = id; // Bu, Brand ID metin alanını doldurur
    this.colorName = name; // Bu, Brand Name metin alanını doldurur

    this.modalRef = this.modalService.show(template);
  }



  ngOnInit(): void {
    this.getColors();
  }

  getColors() {
    this.colorService.getColors().subscribe((response) => {
      this.colors = response.data;
      this.dataLoded = true;
    });
  }





  postColor() {
    var mytoastr = this.toasterService;
    const data = {
      ColorId : this.colorId,
      ColorName: this.colorName,
    };
    console.log(data);
    this.colorService.postColor(data).subscribe(
      (postresponse) => {
        console.log(postresponse);
        mytoastr.success('veri eklendi');
        this.getColors();
      },
      (error) => {
        // Hata işlemleri
        console.log(error);
        mytoastr.error('Veri Eklenemedi', 'Dikkat');

      }
    );
  }

  deleteColor(id: number) {
    var mytoastr = this.toasterService;
    const data = {
      ColorId: id,
      ColorName: this.colorName,
    };
    console.log(data);
    this.colorService.deleteColor(data).subscribe(
      (postresponse) => {
        console.log(postresponse);
        mytoastr.success('veri silindi');
        this.getColors();
      },
      (error) => {
        // Hata işlemleri
        console.log(error);
        mytoastr.error(' işlem başarısız', 'Dikkat');

      }
    );
  }

  updateColor() {
    var mytoastr = this.toasterService;
    const data = {
      ColorId: parseInt(this.colorId),
      ColorName: this.colorName,
     
    };
    console.log(data);

    this.colorService.updateColor(data).subscribe(
      (postresponse) => {
        console.log(postresponse);
        mytoastr.success('veri güncellendi');
        this.getColors();
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
