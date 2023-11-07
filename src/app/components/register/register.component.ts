import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  Email : string;
  Password : string;
  FirstName : string;
  LastName : string;

  constructor (
    private activedRouter:ActivatedRoute,
    private toastrService : ToastrService,
    private authService : AuthService) {}

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  register(){
    var mytostr = this.toastrService;
    var data = {

      Email : this.Email,
      Password : this.Password,
      FirstName : this.FirstName,
      LastName : this.LastName,
    }
    this.authService.register(data).subscribe((response)=>{
      console.log(data);
      this.FirstName = '';
      this.Password = '';
      this.Email = '';
      this.LastName = '';
      mytostr.success('Kayıt Başarılı');
    },(error)=>{
      mytostr.error('kullanıcı bilgileri hatalı');
    })
    
  }
}

