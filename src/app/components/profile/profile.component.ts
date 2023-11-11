import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  profileUpdateForm: FormGroup;
  users: User;
  IsUserLogin : boolean=false;
  Email : string | null = null;

  constructor(
    private userService: UserService,
    private toastrService: ToastrService,
    private formBuilder: FormBuilder,
    private authService :AuthService,
    private localStorageService : LocalStorageService
  ) {}

  ngOnInit(): void {
    this.createUserUpdateForm();
    
    this.IsUserLogin = this.authService.isAuthenticated();
    if(this.IsUserLogin==true)
    {
      this.Email = this.localStorageService.get('email') || '';
      this.getUserDetail(this.Email);
    }
   
  }
  createUserUpdateForm() {
    this.profileUpdateForm = this.formBuilder.group({
      Id: ['', Validators.required],
      FirstName: ['', Validators.required],
      LastName: ['', Validators.required],
      Email: ['', Validators.required],
    });
  }

  getUserDetail(email: string) {
    this.userService.getUsersById(email).subscribe((response) => {
      this.users = response.data;
      console.log(response.data);
      const dataFromParent = {
        Id: this.users.id,
        FirstName: this.users.firstName,
        LastName: this.users.lastName,
        Email: this.users.email,
      };

      // Forma verileri doldurun
      this.profileUpdateForm.patchValue(dataFromParent);
    });
  }

  Update() {
    var mytoastr = this.toastrService;
    console.log(this.profileUpdateForm);
    if (this.profileUpdateForm.valid) {
      let userModel = Object.assign({}, this.profileUpdateForm.value);
      console.log(userModel);
      this.userService.UpdateUser(userModel).subscribe(
        (response) => {
          mytoastr.success('başarılı');
        },
        (error) => {
          // Hata işlemleri
          console.log(error);
          mytoastr.error('güncelleme işlemi başarısız', 'Dikkat');
        }
      );
    } else {
      mytoastr.error(' başarısız', 'Dikkat');
    }
  }
}
