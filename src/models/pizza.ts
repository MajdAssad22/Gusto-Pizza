import { PizzaSize } from "./pizza-size";
import { Topping } from "./topping";

export class Pizza {
    PizzaId: number;
    Size: PizzaSize;
    Quantity: number;
    Toppings: Array<Topping>;
    
    constructor(pizzaId: number, size: PizzaSize, quantity: number, toppings: Array<Topping>){
        this.PizzaId = pizzaId;
        this.Size = size;
        this.Quantity = quantity;
        this.Toppings = toppings;
    }

    pizzaPrice(){
        let totalprice: number = 0;
        for(let topping of this.Toppings){
            totalprice += topping.Price;
        }
        totalprice += this.Size.Price;
        return totalprice * this.Quantity;
    }
}
