import { Token } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  Email : string;
  Password : string;

  constructor (
    private activedRouter:ActivatedRoute,
    private toastrService : ToastrService,
    private authService : AuthService,
    private localStorageService : LocalStorageService,
    private router:Router) {}

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  login(){
    var mytostr = this.toastrService;
    var data = {

      Email : this.Email,
      Password : this.Password,
    }
    this.authService.login(data).subscribe((response)=>{
      console.log(response);
      this.localStorageService.set("token",response.token) // giriş başarılı ise token kaydet
      this.localStorageService.set("email",this.Email) // mail bilgisini kaydet
      window.location.reload();
    
    },(error)=>{
      mytostr.error('kullanıcı bilgileri hatalı');
    })
    
  }


}
