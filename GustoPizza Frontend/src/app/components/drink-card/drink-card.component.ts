import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DrinkOrder } from 'src/models/drink-order';

@Component({
  selector: 'app-drink-card',
  templateUrl: './drink-card.component.html',
  styleUrls: ['./drink-card.component.css']
})
export class DrinkCardComponent{
  @Input() drink: DrinkOrder = new DrinkOrder(0,"",0,0);
  @Output("removeDrink") removeDrink: EventEmitter<any> = new EventEmitter();
  constructor() { }

  deleteDrink(){
    this.removeDrink.emit();
  }
}
