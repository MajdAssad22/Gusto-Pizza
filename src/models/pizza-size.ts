export class PizzaSize {
    SizeId: number;
    SizeName: string;
    SizePrice: number;

    constructor(sizeId: number, sizeName: string, sizePrice: number){
        this.SizeId = sizeId;
        this.SizeName = sizeName;
        this.SizePrice = sizePrice;
    }
}
