import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css']
})
export class NaviComponent implements OnInit {
   IsUserLogin : boolean=false;
   Email : string | null = null;
  constructor(
    private authService : AuthService,
    private localStorageService : LocalStorageService,
    private toastrService : ToastrService,
    private router : Router
  ) {}


  ngOnInit(): void {
    this.IsUserLogin=this.authService.isAuthenticated();
    if(this.IsUserLogin==true){
      this.Email=this.localStorageService.get("email");
    }
  }

  Logout(){
    this.localStorageService.clean();
    this.toastrService.success("Başarıyla Çıkış Yapıldı");
    this.IsUserLogin=this.authService.isAuthenticated();
    this.router.navigate(["/"])
  }
}
