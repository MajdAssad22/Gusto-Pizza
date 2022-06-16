export class Topping {
    ToppingId: number;
    ToppingName: string;
    ToppingPrice: number;

    constructor(toppingId: number, toppingName: string, toppingPrice: number){
        this.ToppingId = toppingId;
        this.ToppingName = toppingName;
        this.ToppingPrice = toppingPrice;
    }
}
