export class PizzaSize {
    SizeId: number;
    SizeName: string;
    SizePrice: number;

    constructor(SizeId?: number, SizeName?: string, SizePrice?: number){
        this.SizeId = SizeId ?? 0;
        this.SizeName = SizeName ?? "";
        this.SizePrice = SizePrice ?? 0;
    }
}
