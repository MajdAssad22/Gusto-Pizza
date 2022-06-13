import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string = "";
  password: string = "";
  invalidData: boolean = false;

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
  }

  tryLoginIn(){
    let isCustomerVerified = this.loginService.verifyCustomer(this.email, this.password);
    if(isCustomerVerified){
      this.router.navigate(['/Home']);
    }else{
      this.invalidData = true;
    }
  }

  resetData(){
    this.email = "";
    this.password = "";
    this.invalidData = false;
  }
}
