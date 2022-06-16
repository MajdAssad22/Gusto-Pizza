import { Component, OnInit } from '@angular/core';
import { Order } from 'src/models/order';
import { CustomerService } from 'src/services/customer.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  orders: Array<Order> = new Array();
  constructor(private customerService: CustomerService) { }

  ngOnInit(): void {
    this.customerService.getOrders()
      .then(
        (result) => this.orders = result,
        () => console.log("ERROR!"));
  }
  test(){
    this.customerService.getOrders()
      .then(
        (result) => console.log(result),
        () => console.log("ERROR!"));
  }
}
