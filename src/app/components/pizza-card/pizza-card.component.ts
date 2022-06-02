import { Component, Input } from '@angular/core';
import { Pizza } from 'src/models/pizza';
import { PizzaSize } from 'src/models/pizza-size';

@Component({
  selector: 'app-pizza-card',
  templateUrl: './pizza-card.component.html',
  styleUrls: ['./pizza-card.component.css']
})
export class PizzaCardComponent {
  @Input() pizza: Pizza = new Pizza(0,new PizzaSize(0,"",0) ,0, new Array());
  
  constructor() { }
}
