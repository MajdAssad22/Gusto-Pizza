import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserAuthGuard } from 'src/services/user-auth.guard';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { NewOrderComponent } from './pages/new-order/new-order.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { RegisterComponent } from './pages/register/register.component';

const routes: Routes = [
  { path: '', redirectTo: '/Login', pathMatch: 'full' },
  { path: "Login", component: LoginComponent},
  { path: "Register", component: RegisterComponent},
  { path: "Home" , component: HomeComponent, canActivate:[UserAuthGuard]},
  { path: "NewOrder", component: NewOrderComponent, canActivate:[UserAuthGuard]},
  { path: "Orders", component: OrdersComponent, canActivate:[UserAuthGuard]},
  { path: "AboutUs", component: AboutUsComponent, canActivate:[UserAuthGuard]},
  { path: "ContactUs", component: ContactUsComponent, canActivate:[UserAuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
