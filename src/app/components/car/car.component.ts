import { Component } from '@angular/core';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent {

  car1 = {
    carId : 1,
    carName : "BMW"
  };
  car2 = {
    carId : 1,
    carName : "BMW"
  };
  car3 = {
    carId : 1,
    carName : "BMW"
  };

cars=[this.car1, this.car2, this.car3];
  

}
