import { Drink } from "./drink";
import { Pizza } from "./pizza";

export class Order {
    OrderId: number;
    IsDone: boolean;
    DateOfOrder: Date;
    Pizzas: Array<Pizza> = new Array<Pizza>();
    Drinks: Map<Drink, number> = new Map<Drink, number>();

    constructor(orderId: number, state: boolean, dateOfOrder: Date, pizzas?: Array<Pizza>, drinks?: Map<Drink, number>){
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
            total += drink[0].Price * drink[1];
        }
        return total;
    }
}
