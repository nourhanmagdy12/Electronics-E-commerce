import { Routes } from '@angular/router';
import { Home } from './Components/home/home';
import { ProductsPage } from './Components/products-page/products-page';
import { ProductDetails } from './Components/product-details/product-details';
import { AuthLoginComponent } from './Components/auth-login/auth-login';
import { AuthRegisterComponent } from './Components/auth-register/auth-register';
import { Wishlist } from './Components/wishlist/wishlist';
import { AuthGuard } from './Guards/auth-guard';
import { AdminGuard } from './Guards/admin-guard';
import { LoadingComponent } from './Components/loading/loading';
import { NotFoundComponent } from './Components/not-found/not-found';
import { UserProfileComponent } from './Components/user-profile/user-profile';
import { cart } from './Components/cart/cart';
import { Checkout } from './Components/checkout/checkout';
import { OrderSuccess } from './Components/order-success/order-success';
import { DashboardComponent } from './Components/admin/admin';

export const routes: Routes = [
  { path: '', component: Home, pathMatch: 'full', title: 'Home' },
  { path: 'home', component: Home, title: 'Home' },

  { path: 'products', component: ProductsPage, canActivate: [AuthGuard], title: 'Products List' },
  { path: 'product/:id', component: ProductDetails, canActivate: [AuthGuard], title: 'Product Details' },
  { path: 'wishlist', component: Wishlist, canActivate: [AuthGuard], title: 'Wishlist' },
  { path: 'cart', component: cart, canActivate: [AuthGuard], title: 'Cart' },
  { path: 'checkout', component: Checkout, canActivate: [AuthGuard], title: 'Checkout' },
  { path: 'order-success', component: OrderSuccess, canActivate: [AuthGuard], title: 'Order Success' },
  { path: 'profile', component: UserProfileComponent, canActivate: [AuthGuard], title: 'Profile' },

  { path: 'login', component: AuthLoginComponent, title: 'Login' },
  { path: 'register', component: AuthRegisterComponent, title: 'Register' },

  { path: 'dashboard', component: DashboardComponent, canActivate: [AdminGuard], title: 'Admin Dashboard' },

  { path: 'loading', component: LoadingComponent, title: 'Loading' },
  { path: '**', component: NotFoundComponent, title: 'Not Found' }
];
