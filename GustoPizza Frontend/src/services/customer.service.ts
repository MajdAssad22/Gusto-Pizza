import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Customer } from 'src/models/customer';
import { Order } from 'src/models/order';
import { Pizza } from 'src/models/pizza';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  currentCustomer: Customer = new Customer();
  currentOrder: Order = new Order();
  orders: Array<Order> = new Array<Order>();

  constructor(private http: HttpClient) { }

  public getOrders(): Promise<any> {
    let promise = new Promise((resolve, reject) =>{
      this.http.post<Array<Order>>(`${environment.server_url}orders/getCustomerOrders`, this.currentCustomer).subscribe(result => {
        if(result){
          this.orders.splice(0);
          result.forEach(order => {
            var pizzas: Array<Pizza> = new Array<Pizza>();
            order.Pizzas.forEach((pizza: any) => {
              var pizzaObj: Pizza = Object.assign(new Pizza(), pizza);
              pizzas.push(pizzaObj);
            });
            var orderObj: Order = Object.assign(new Order(), order);
            orderObj.Pizzas = pizzas;
            this.orders.push(orderObj);
          });
          resolve(this.orders);
        }
        reject();
      });
    });
    return promise;
  }
  
  public addOrder(): Promise<any>{
    let promise = new Promise((resolve, reject) =>{
      let customerOrder: any = {
        "Customer": this.currentCustomer,
        "Order": this.currentOrder 
      };
      this.http.post<any>(`${environment.server_url}orders/addOrder`, customerOrder).subscribe(result => {
        if(result){
          this.currentOrder = new Order();
          this.getOrders().then(
            (orders) => {resolve(orders)},
            () => reject()
            )
        }else{
          reject();
        }
      });
    });
    return promise;
  }

  public  updateCustomer(id: number): void{
    this.http.post<Array<Customer>>(`${environment.server_url}customers/getCustomer`, {'id': id}).subscribe(async result => {
      if(result){
        let customer = result[0];
        this.currentCustomer.CustomerId = customer.CustomerId;
        this.currentCustomer.FirstName = customer.FirstName;
        this.currentCustomer.LastName = customer.LastName;
        this.currentCustomer.Address = customer.Address;
        this.currentCustomer.Email = customer.Email;
        this.currentCustomer.Password = customer.Password;
        this.currentCustomer.Phone = customer.Phone;
        this.getOrders();
      }
    });
  }
}
