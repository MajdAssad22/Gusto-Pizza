import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from 'src/models/customer';
import { CustomerService } from 'src/services/customer.service';
import { LoginService } from 'src/services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  customer: Customer = new Customer();
  
  constructor(private customerService: CustomerService, private loginService: LoginService, private router: Router) {
  }

  ngOnInit(): void {
    this.customer = this.customerService.currentCustomer;
  }
  logout(): void{
    this.loginService.logout();
    this.router.navigate(['/Login']);
  }
}
