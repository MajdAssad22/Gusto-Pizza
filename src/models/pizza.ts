import { PizzaSize } from "./pizza-size";
import { Topping } from "./topping";

export class Pizza {
    PizzaId: number;
    Size: PizzaSize;
    Quantity: number;
    Toppings: Array<Topping>;
    
    constructor(pizzaId? : number, size? : PizzaSize, quantity? : number, toppings? : Array<Topping>){
        this.PizzaId = pizzaId ?? 0;
        this.Size = size ?? new PizzaSize();
        this.Quantity = quantity ?? 0;
        this.Toppings = toppings ?? new Array<Topping>();
    }

    pizzaPrice(){
        let totalprice: number = 0;
        for(let topping of this.Toppings){
            totalprice += topping.ToppingPrice;
        }
        totalprice += this.Size.SizePrice;
        return totalprice * this.Quantity;
    }
}
