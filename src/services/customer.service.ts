import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Customer } from 'src/models/customer';
import { Order } from 'src/models/order';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  currentCustomer: Customer = new Customer(-1,"","","","","","");

  constructor(private http: HttpClient) { }

  public getOrders(): Promise<any> {
    let promise = new Promise((resolve, reject) =>{
      var id = this.currentCustomer.CustomerId;
      let customerId: any = {
        id
      };
      this.http.post<Array<Order>>(`http://localhost:3000/orders/getCustomerOrders`, customerId).subscribe(result => {
        if(result){
          resolve(result);
        }
        reject();
      });
    });
    return promise;
  }
}
