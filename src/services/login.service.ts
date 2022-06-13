import { Injectable } from '@angular/core';
import { Customer } from 'src/models/customer';
import { CustomerService } from './customer.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private isLoggedInSource = new BehaviorSubject<boolean>(false);
  isLoggedIn = this.isLoggedInSource.asObservable();

  constructor(private customerService: CustomerService) { }

  verifyCustomer(email: string, password: string): boolean{
    //TODO: Add the verfication of the customer.
    if(email != "" && password != ""){
      this.customerService.currentCustomer = new Customer(1,"Majd","Assad",undefined,undefined,email,undefined);
      this.isLoggedInSource.next(true);
      return true;
    }
    return false;
  }
}
