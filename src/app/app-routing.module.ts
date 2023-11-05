import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarComponent } from './components/car/car.component';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { PaymentComponent } from './components/payment/payment.component';
import { BrandlistComponent } from './components/brandlist/brandlistComponent';

const routes: Routes = [
  {path:"",pathMatch:"full",component:CarComponent},// sayfa boş iken carComponenti görüntüle
  {path:"cars",component:CarComponent},
  {path:"cars/brand/:brandId",component:CarComponent},
  {path:"cars/color/:colorId",component:CarComponent},
  {path:"cars/carDetails/:id",component:CarDetailComponent},
  {path:"payment/:id/:rentdate/:returndate",component:PaymentComponent},
  {path:"brandlist",component:BrandlistComponent},
  {path:"cars/car/:carId",component:CarDetailComponent}  // tıklandığında ilgili bilgilerin gelmesi
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
