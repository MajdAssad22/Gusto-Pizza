import { Drink } from "./drink";
import { DrinkOrder } from "./drink-order";
import { Pizza } from "./pizza";

export class Order {
    OrderId: number;
    IsDone: boolean;
    DateOfOrder: Date;
    Pizzas: Array<Pizza> = new Array<Pizza>();
    Drinks: Array<DrinkOrder> = new Array<DrinkOrder>();

    constructor(orderId: number, state: boolean, dateOfOrder: Date, pizzas?: Array<Pizza>, drinks?: Array<DrinkOrder>){
        this.OrderId = orderId;
        this.IsDone = state;
        this.DateOfOrder = dateOfOrder;
        if(pizzas){
            this.Pizzas = pizzas;
        }
        if(drinks){
            this.Drinks = drinks;
        }
    }

    totalOrderPrice():number{
        let total = 0;
        for(let pizza of this.Pizzas){
            total += pizza.pizzaPrice();
        }
        for(let drink of this.Drinks){
            total += drink.Price * drink.Quantity;
        }
        return total;
    }
}
