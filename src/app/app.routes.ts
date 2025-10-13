import { Routes } from '@angular/router';
import { home } from './components/home/home';
import { About } from './components/about/about';
import { Contact } from './components/contact/contact';
import { Products } from './components/products/products';
import { NotFound } from './components/not-found/not-found';
import { Cart } from './components/cart/cart';
import { Checkout } from './components/checkout/checkout';

export const routes: Routes = [
  {path:'', redirectTo:'home', pathMatch:'full'},
  {path:'home', component:home, title:'Home'},
  {path:'about', component:About, title:"About"},
  {path:'contact',component:Contact, title:'Contact'},
  {path:'products',component:Products, title:'Products'},
  {path:'cart',component:Cart, title:'Cart',},
  {path:'Checkout',component:Checkout, title:'Checkout'},
  {path:'**',component:NotFound, title:'NotFound'}

];
