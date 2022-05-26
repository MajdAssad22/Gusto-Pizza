import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { NewOrderComponent } from './pages/new-order/new-order.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { RegisterComponent } from './pages/register/register.component';

const routes: Routes = [
  { path: '', redirectTo: '/Home', pathMatch: 'full' },
  { path: "Home", component: HomeComponent},
  { path: "Login", component: LoginComponent},
  { path: "Register", component: RegisterComponent},
  { path: "NewOrder",  component: NewOrderComponent},
  { path: "Orders",  component: OrdersComponent},
  { path: "AboutUs",  component: AboutUsComponent},
  { path: "ContactUs",  component: ContactUsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
