import { Drink } from "./drink";

export class DrinkOrder extends Drink{
    Quantity: number;

    constructor(DrinkId: number, DrinkName: string, DrinkPrice: number, Quantity: number){
        super(DrinkId,DrinkName,DrinkPrice);
        this.Quantity = Quantity;
    }
}
