import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Customer } from 'src/models/customer';
import { CustomerService } from './customer.service';
import { BehaviorSubject, Observable } from 'rxjs';

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
          // Correct Information
          this.isLoggedInSource.next(true);
          this.customerService.currentCustomer = customer;
          this.customerService.getOrders();
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
}
