import { Routes } from '@angular/router';
import { Cart } from './components/cart/cart';
import { Checkout } from './components/checkout/checkout';

export const routes: Routes = [

  
  {path:'cart',component:Cart, title:'Cart',},
  {path:'Checkout',component:Checkout, title:'Checkout'},


];
