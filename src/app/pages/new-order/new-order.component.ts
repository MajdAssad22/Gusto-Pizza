import { Component, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Drink } from 'src/models/drink';
import { Order } from 'src/models/order';
import { Pizza } from 'src/models/pizza';
import { PizzaSize } from 'src/models/pizza-size';
import { Topping } from 'src/models/topping';

@Component({
  selector: 'app-new-order',
  templateUrl: './new-order.component.html',
  styleUrls: ['./new-order.component.css']
})
export class NewOrderComponent {
  currentOrder: Order;
  availableToppings: Array<Topping> = new Array<Topping>();
  availableDrinks: Array<Drink> = new Array<Drink>();
  availableSizes: Array<PizzaSize> = new Array<PizzaSize>();
  ModalRef?: BsModalRef;
  
  constructor(private modalService: BsModalService) {
    // Data Init
    this.currentOrder = new Order(1,false,new Date());
    this.availableToppings.push(new Topping(1,"Extra Cheese",3));
    this.availableToppings.push(new Topping(2,"Paparoni",5));
    this.availableToppings.push(new Topping(3,"Bellpeper",4));

    this.availableDrinks.push(new Drink(1,"Coke",3));
    this.availableDrinks.push(new Drink(2,"Fanta",5));
    this.availableDrinks.push(new Drink(3,"Orange Juice",4));
    this.availableDrinks.push(new Drink(3,"Blackberry Juice",6));

    this.availableSizes.push(new PizzaSize(1,"Small",10));
    this.availableSizes.push(new PizzaSize(2,"Medium",25));
    this.availableSizes.push(new PizzaSize(3,"Large",35));
    this.availableSizes.push(new PizzaSize(4,"X-Large",55));

    // Demo Data
    // this.currentOrder.Pizzas.push(new Pizza(1,this.availableSizes[0],5,[this.availableToppings[1],this.availableToppings[2]]));
    // this.currentOrder.Pizzas.push(new Pizza(2,this.availableSizes[1],2,[this.availableToppings[0],this.availableToppings[1]]));
    // this.currentOrder.Pizzas.push(new Pizza(3,this.availableSizes[3],1,[this.availableToppings[1],this.availableToppings[2]]));
    // this.currentOrder.Drinks.set(this.availableDrinks[0],1);
    // this.currentOrder.Drinks.set(this.availableDrinks[1],2);
    // this.currentOrder.Drinks.set(this.availableDrinks[2],3);
  }

  showModal(template: TemplateRef<any>){
    this.ModalRef = this.modalService.show(template);
  }

  addPizza(){

  }

  addDrink(){

  }
}
