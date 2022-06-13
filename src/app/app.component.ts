import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Gusto Pizza';
  isLoggedIn: boolean = false;

  constructor(private loginService:LoginService){ }

  ngOnInit(): void {
    this.loginService.isLoggedIn.subscribe(isLoggedIn => this.isLoggedIn = isLoggedIn)
  }
}
