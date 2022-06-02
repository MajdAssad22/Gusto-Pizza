import { Component, Input } from '@angular/core';
import { Drink } from 'src/models/drink';

@Component({
  selector: 'app-drink-card',
  templateUrl: './drink-card.component.html',
  styleUrls: ['./drink-card.component.css']
})
export class DrinkCardComponent{
  @Input() drink: Drink = new Drink(0,"",0);
  @Input() quantity: number = 1;
  constructor() { }
}
