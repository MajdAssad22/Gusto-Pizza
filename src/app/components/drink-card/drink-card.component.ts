import { Component, Input } from '@angular/core';
import { Drink } from 'src/models/drink';
import { DrinkOrder } from 'src/models/drink-order';

@Component({
  selector: 'app-drink-card',
  templateUrl: './drink-card.component.html',
  styleUrls: ['./drink-card.component.css']
})
export class DrinkCardComponent{
  @Input() drink: DrinkOrder = new DrinkOrder(0,"",0,0);
  quantity: number = this.drink.Quantity;
  constructor() { }
}
