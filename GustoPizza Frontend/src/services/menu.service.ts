import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Drink } from 'src/models/drink';
import { PizzaSize } from 'src/models/pizza-size';
import { Topping } from 'src/models/topping';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  maxNumberOfDrinks: number = 50;
  maxNumberOfPizzas: number = 50;
  availableToppings: Array<any> = new Array<any>();
  availableDrinks: Array<Drink> = new Array<Drink>();
  availablePizzaSizes: Array<PizzaSize> = new Array<PizzaSize>();

  constructor(private http: HttpClient) {
    this.getAvailableDrinks();
  }

  public getAvailableDrinks(): Observable<Array<Drink>> {
    return this.http.get<Array<Drink>>(`${environment.server_url}drinks`);
  }
  public getAvailableSizes(): Observable<Array<PizzaSize>> {
    return this.http.get<Array<PizzaSize>>(`${environment.server_url}sizes`);
  }
  public getAvailableToppings(): Observable<Array<Topping>> {
    return this.http.get<Array<Topping>>(`${environment.server_url}toppings`);
  }
}
