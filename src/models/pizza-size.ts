export class PizzaSize {
    SizeId: number;
    Name: string;
    Price: number;

    constructor(sizeId: number, sizeName: string, sizePrice: number){
        this.SizeId = sizeId;
        this.Name = sizeName;
        this.Price = sizePrice;
    }
}
