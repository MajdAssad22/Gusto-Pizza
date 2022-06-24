import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Customer } from 'src/models/customer';
import { CustomerService } from './customer.service';
import { BehaviorSubject, observable, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private isLoggedInSource = new BehaviorSubject<boolean>(false);
  isLoggedIn = this.isLoggedInSource.asObservable();

  constructor(private customerService: CustomerService, private http: HttpClient) { }

  public login(email: string, password: string): Promise<any> {
    let loginInfo: any = {
      email: email,
      password: password
    };
    let promise = new Promise((resolve, reject) =>{
      this.http.post<Customer>(`http://localhost:3000/customers/login`, loginInfo).subscribe(customer => {
        if(customer){
          this.isLoggedInSource.next(true);
          this.customerService.currentCustomer = customer;
          this.customerService.getOrders();
          // Save data in session storage
          this.setSessionData();
          resolve(customer);
        }
        reject();
      });
    });
    return promise;
  }

  public register(newCustomer: Customer): Promise<any> {
    let promise = new Promise((resolve, reject) =>{
      this.http.post(`http://localhost:3000/customers/register`, newCustomer).subscribe((result) => {
        //Correct Info
        resolve(result);
      }, (err: HttpErrorResponse)=>{
        //Bad Info
        reject(err.statusText);
      });
    });
    return promise;
  }

  public logout(): void{
    this.isLoggedInSource.next(false);
    this.customerService.currentCustomer = new Customer();
    sessionStorage.clear();
  }

  public getSessionData(): void{
    let loggedInValue = sessionStorage.getItem('isLoggedIn') == 'true';
    this.isLoggedInSource.next(loggedInValue);
    if(loggedInValue){
      let customerIdValue = sessionStorage.getItem('customerId');
      this.customerService.updateCustomer(Number(customerIdValue));
    }
  }

  public setSessionData(): void{
    sessionStorage.setItem('isLoggedIn', 'true');
    sessionStorage.setItem('customerId', `${this.customerService.currentCustomer.CustomerId}`);
  }
}
