import { Component, OnInit, TemplateRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Drink } from 'src/models/drink';
import { DrinkOrder } from 'src/models/drink-order';
import { Order } from 'src/models/order';
import { Pizza } from 'src/models/pizza';
import { PizzaSize } from 'src/models/pizza-size';
import { Topping } from 'src/models/topping';
import { CustomerService } from 'src/services/customer.service';
import { MenuService } from 'src/services/menu.service';

@Component({
  selector: 'app-new-order',
  templateUrl: './new-order.component.html',
  styleUrls: ['./new-order.component.css']
})
export class NewOrderComponent implements OnInit {
  maxNumberOfDrinks: number = 0;
  maxNumberOfPizzas: number = 0;
  isLoading: boolean = false;
  currentOrder: Order = new Order();
  availableToppings: Array<any> = new Array<any>();
  availableDrinks: Array<Drink> = new Array<Drink>();
  availableSizes: Array<PizzaSize> = new Array<PizzaSize>();
  ModalRef?: BsModalRef;
  
  constructor(private modalService: BsModalService, private menu: MenuService, private customerService: CustomerService) {
    // Data Init
    this.currentOrder = this.customerService.currentOrder;
    this.maxNumberOfDrinks = this.menu.maxNumberOfDrinks;
    this.maxNumberOfPizzas = this.menu.maxNumberOfPizzas;

    this.menu.getAvailableDrinks().subscribe(drinks =>{
      this.availableDrinks = drinks;
    });

    this.menu.getAvailableSizes().subscribe(sizes =>{
      this.availableSizes = sizes;
    });

    this.menu.getAvailableToppings().subscribe(toppings =>{
      toppings.forEach(topping => {
        this.availableToppings.push({
          Topping: topping,
          IsSelected: false
        });
      });
    });
  }

  ngOnInit(): void {
    this.modalService.onHidden.subscribe((reason: string) => {
      this.getAndResetCheckedToppings();
    })
  }

  showModal(template: TemplateRef<any>){
    this.ModalRef = this.modalService.show(template);
  }

  addPizza(addPizzaFrom: NgForm){
    let toppings = this.getAndResetCheckedToppings();
    let pizza: Pizza = new Pizza(
      undefined,
      new PizzaSize(addPizzaFrom.value.PizzaSize.SizeId,
        addPizzaFrom.value.PizzaSize.SizeName,
        addPizzaFrom.value.PizzaSize.SizePrice),
      addPizzaFrom.value.Quantity,
      toppings
    )
    let totalNumberOfPizzas: number = 0;
    this.currentOrder.Pizzas.forEach(pizza => {
      totalNumberOfPizzas += pizza.Quantity;
    });
    if(totalNumberOfPizzas + pizza.Quantity <= this.maxNumberOfPizzas){
      this.currentOrder.Pizzas.push(pizza);
      this.ModalRef?.hide();
    }else{
      if(totalNumberOfPizzas == this.maxNumberOfPizzas){
        alert('Cannot add more pizzas.');
        this.ModalRef?.hide();
      }else{
        alert(`Cannot add this much pizza, Could add ${this.maxNumberOfPizzas - totalNumberOfPizzas} pizzas.`)
      }
    }
  }

  addDrink(addDrinkForm: NgForm){
    let newDrink: DrinkOrder = new DrinkOrder(
      addDrinkForm.value.Drink.DrinkId,
      addDrinkForm.value.Drink.DrinkName,
      addDrinkForm.value.Drink.DrinkPrice,
      addDrinkForm.value.Quantity
    )
    let found: DrinkOrder | undefined = this.currentOrder.Drinks.find((searchedDrink) => {
      return searchedDrink.DrinkId == newDrink.DrinkId;
    });
    if(found !== undefined){
      let newQuantity = found.Quantity + newDrink.Quantity;
      if(newQuantity <= this.maxNumberOfDrinks){
        found.Quantity += newDrink.Quantity;
        this.ModalRef?.hide();
      }else{
        alert(`Cannot add this much ${newDrink.DrinkName}`);
      }
    }else{
      this.currentOrder.Drinks.push(newDrink);
      this.ModalRef?.hide();
    }
  }

  checkout(){
    this.isLoading = true;
    this.customerService.addOrder()
    .then(
      () => {
        this.currentOrder = this.customerService.currentOrder;
        this.ModalRef?.hide();
        this.isLoading = false;
      }
    );
  }

  getAndResetCheckedToppings(){
    let toppings = new Array<Topping>();
    this.availableToppings.forEach(toppingCheckbox => {
      if(toppingCheckbox.IsSelected){
        toppings.push(new Topping(toppingCheckbox.Topping.ToppingId,
          toppingCheckbox.Topping.ToppingName,
          toppingCheckbox.Topping.ToppingPrice));
        toppingCheckbox.IsSelected = false;
      }
    });
    return toppings;
  }

  removePizza(index: number){
    this.currentOrder.Pizzas.splice(index, 1);
  }

  removeDrink(index: number){
    this.currentOrder.Drinks.splice(index, 1);
  }
}
