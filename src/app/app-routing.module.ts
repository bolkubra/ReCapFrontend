import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarComponent } from './components/car/car.component';
import { CarDetailComponent } from './components/car-detail/car-detail.component';

const routes: Routes = [
  {path:"",pathMatch:"full",component:CarComponent},// sayfa boş iken carComponenti görüntüle
  {path:"cars",component:CarComponent},
  {path:"cars/brand/:brandId",component:CarComponent},
  {path:"cars/color/:colorId",component:CarComponent},
  {path:"cars/carDetails/:id",component:CarDetailComponent},
  {path:"cars/car/:carId",component:CarDetailComponent}  // tıklandığında ilgili bilgilerin gelmesi
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
