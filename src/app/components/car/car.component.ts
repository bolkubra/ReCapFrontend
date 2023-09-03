import { Component } from '@angular/core';
import { Car } from 'src/app/models/car';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent {

  

cars : Car [] =[];
  
constructor () {}
ngOnInit():void{}
}
