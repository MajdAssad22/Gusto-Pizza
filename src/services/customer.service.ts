import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Customer } from 'src/models/customer';
import { Order } from 'src/models/order';
import { Pizza } from 'src/models/pizza';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  currentCustomer: Customer = new Customer(-1,"","","","","","");
  currentOrder: Order = new Order();
  orders: Array<Order> = new Array<Order>();

  constructor(private http: HttpClient) { }

  public getOrders(): Promise<any> {
    let promise = new Promise((resolve, reject) =>{
      this.http.post<Array<Order>>(`http://localhost:3000/orders/getCustomerOrders`, this.currentCustomer).subscribe(result => {
        if(result){
          var orders: Array<Order> = new Array<Order>();
          result.forEach(order => {
            var pizzas: Array<Pizza> = new Array<Pizza>();
            order.Pizzas.forEach((pizza: any) => {
              var pizzaObj: Pizza = Object.assign(new Pizza(), pizza);
              pizzas.push(pizzaObj);
            });
            var orderObj: Order = Object.assign(new Order(), order);
            orderObj.Pizzas = pizzas;
            orders.push(orderObj);
          });
          this.orders = orders;
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
      this.http.post<any>(`http://localhost:3000/orders/addOrder`, customerOrder).subscribe(result => {
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
}
