import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  constructor(private router : Router){   
  }
  title = 'recap';
  ngOnInit() {
    // Ana rotaya yapılan isteği ele almak için yönlendirme işlemi
    this.router.navigate(['/cars']);
  }
}
