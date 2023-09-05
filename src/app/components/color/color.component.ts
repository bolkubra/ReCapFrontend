import { Component } from '@angular/core';
import { Color } from 'src/app/models/color';
import { colorResponseModel } from 'src/app/models/colorResponseModel';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.css']
})
export class ColorComponent {
  colors : Color [] = [];

  colorResponseModel : colorResponseModel={
    data : this.colors,
    messgae : " ",
    succes : true
  };

  constructor (private ColorService : ColorService) {}

  ngOnInit():void{
    this.getColors(); 
  }

  getColors() {
    this.ColorService.getColors().subscribe(response=>{
      this.colors=response.data
      });
    }
}
