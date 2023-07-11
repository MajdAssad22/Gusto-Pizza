import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Pizza } from 'src/models/pizza';

@Component({
  selector: 'app-pizza-card',
  templateUrl: './pizza-card.component.html',
  styleUrls: ['./pizza-card.component.css']
})
export class PizzaCardComponent {
  @Input() pizza: Pizza = new Pizza();
  @Output("removePizza") removePizza: EventEmitter<any> = new EventEmitter();
  constructor() { }

  deletePizza(){
    this.removePizza.emit();
  }
}
