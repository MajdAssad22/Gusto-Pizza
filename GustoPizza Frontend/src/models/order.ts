import { DrinkOrder } from "./drink-order";
import { Pizza } from "./pizza";

export class Order {
    OrderId: number;
    IsDone: boolean;
    DateOfOrder: Date;
    Pizzas: Array<Pizza>;
    Drinks: Array<DrinkOrder>;

    constructor(orderId?: number, state?: boolean, dateOfOrder?: Date, pizzas?: Array<Pizza>, drinks?: Array<DrinkOrder>){
        this.OrderId = orderId ?? 0;
        this.IsDone = state ?? false;
        this.DateOfOrder = dateOfOrder ?? new Date();
        this.Pizzas = pizzas ?? new Array<Pizza>();
        this.Drinks = drinks ?? new Array<DrinkOrder>();
    }

    totalOrderPrice():number{
        let total = 0;
        for(let pizza of this.Pizzas){
            total += pizza.pizzaPrice();
        }
        for(let drink of this.Drinks){
            total += drink.DrinkPrice * drink.Quantity;
        }
        return total;
    }
}
