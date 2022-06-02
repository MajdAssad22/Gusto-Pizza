export class Topping {
    ToppingId: number;
    Name: string;
    Price: number;

    constructor(toppingId: number, toppingName: string, toppingPrice: number){
        this.ToppingId = toppingId;
        this.Name = toppingName;
        this.Price = toppingPrice;
    }
}
