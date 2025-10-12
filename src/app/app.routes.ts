import { Routes } from '@angular/router';
import { Home } from './Components/home/home';
import { ProductsPage } from './Components/products-page/products-page';
import { ProductDetails } from './Components/product-details/product-details';
import { AuthLoginComponent } from './Components/auth-login/auth-login';
import { AuthRegisterComponent } from './Components/auth-register/auth-register';
import { Wishlist } from './Components/wishlist/wishlist';
import { AuthGuard } from './Guards/auth-guard';
import { LoadingComponent } from './Components/loading/loading';
import { NotFoundComponent } from './Components/not-found/not-found';
import { UserProfileComponent } from './Components/user-profile/user-profile';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'home', component: Home },
  { path: 'products', component: ProductsPage, canActivate: [AuthGuard]  },
  { path: 'product/:id', component: ProductDetails ,canActivate: [AuthGuard]  },
  { path: 'wishlist', component: Wishlist, canActivate: [AuthGuard] },
  { path: 'login', component: AuthLoginComponent },
  { path: 'register', component: AuthRegisterComponent },
  { path: 'loading', component: LoadingComponent },
   { path: 'profile', component: UserProfileComponent, canActivate: [AuthGuard] },
  { path: '**', component: NotFoundComponent }
];
