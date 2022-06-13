import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/models/customer';
import { CustomerService } from 'src/services/customer.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  customer: Customer;
  
  constructor(private customerService: CustomerService) {
    this.customer = this.customerService.currentCustomer;
  }

  ngOnInit(): void {
  }

}
