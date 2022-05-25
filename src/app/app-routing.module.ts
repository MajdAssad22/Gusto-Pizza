import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NewOrderComponent } from './components/new-order/new-order.component';
import { OrdersComponent } from './components/orders/orders.component';

const routes: Routes = [
  { path: '', redirectTo: '/Home', pathMatch: 'full' },
  { path: "Home", component: HomeComponent},
  { path: "Login", component: LoginComponent},
  { path: "NewOrder",  component: NewOrderComponent},
  { path: "Orders",  component: OrdersComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
