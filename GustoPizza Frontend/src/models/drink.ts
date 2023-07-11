export class Drink {
    DrinkId: number;
    DrinkName: string;
    DrinkPrice: number;

    constructor(sizeId: number, drinkName: string, drinkPrice: number){
        this.DrinkId = sizeId;
        this.DrinkName = drinkName;
        this.DrinkPrice = drinkPrice;
    }
}
