export class Drink {
    DrinkId: number;
    Name: string;
    Price: number;

    constructor(sizeId: number, drinkName: string, drinkPrice: number){
        this.DrinkId = sizeId;
        this.Name = drinkName;
        this.Price = drinkPrice;
    }
}
