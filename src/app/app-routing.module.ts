import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarComponent } from './components/car/car.component';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { PaymentComponent } from './components/payment/payment.component';
import { BrandlistComponent } from './components/brandlist/brandlistComponent';
import { CarAddComponent } from './components/car-add/car-add.component';
import { CarUpdateComponent } from './components/car-update/car-update.component';
import { ColorlistComponent } from './components/colorlist/colorlist.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginGuard } from './guards/login.guard';
import { ProfileComponent } from './components/profile/profile.component';

const routes: Routes = [
  {path:"",pathMatch:"full",component:CarComponent},// sayfa boş iken carComponenti görüntüle
  {path:"cars",component:CarComponent},
  {path:"cars/brand/:brandId",component:CarComponent},
  {path:"cars/color/:colorId",component:CarComponent},
  {path:"cars/carDetails/:id",component:CarDetailComponent},
  {path:"payment/:id/:rentdate/:returndate",component:PaymentComponent},
  {path:"brandlist",component:BrandlistComponent,canActivate:[LoginGuard]},
  {path:"colorlist",component:ColorlistComponent,canActivate:[LoginGuard]},
  {path:"cars/add",component:CarAddComponent,canActivate:[LoginGuard]}, //canActive kullanın girişini kontrol eder
  {path:"cars/update/:carId",component:CarUpdateComponent,canActivate:[LoginGuard]},
  {path:"login",component:LoginComponent},
  {path:"register",component:RegisterComponent},
  {path:"profile",component:ProfileComponent,canActivate:[LoginGuard]},
  {path:"cars/car/:carId",component:CarDetailComponent}  // tıklandığında ilgili bilgilerin gelmesi
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
