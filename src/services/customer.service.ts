import { Injectable } from '@angular/core';
import { Customer } from 'src/models/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  currentCustomer: Customer = new Customer(-1,"","");

  constructor() { }
}
