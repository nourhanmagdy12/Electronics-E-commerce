import { Component } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterOutlet } from "@angular/router";
import { CartService } from '../../Services/cart-service'; // استيراد الخدمة
import { CartItem } from '../../Models/cart-item';
import { ToastService } from '../../Services/toast-service';

@Component({
  selector: 'app-cart',
  standalone: true, 
  imports: [CommonModule, FormsModule, RouterLink, CurrencyPipe],
  templateUrl: './cart.html',
  styleUrls: ['./cart.css']
})
 
export class cart {
  
 
  items;
  subtotal;
  tax;
  shipping;
  total;

  constructor(private cartService: CartService, private toastService: ToastService) {

    this.items = this.cartService.items;
    this.subtotal = this.cartService.subtotal;
    this.tax = this.cartService.tax;
    this.shipping = this.cartService.shipping;
    this.total = this.cartService.total;
  }

  increase(item: CartItem) {
    this.cartService.increaseQuantity(item);
    this.toastService.showToast(`Increased quantity of ${item.name}`, 'success');
  }

  decrease(item: CartItem) {
    this.cartService.decreaseQuantity(item);
    this.toastService.showToast(`Decreased quantity of ${item.name}`, 'success');
  }

  remove(item: CartItem) {
    this.cartService.remove(item);
    this.toastService.showToast(`Removed ${item.name} from cart`, 'success');
  }

  addToWishlist(item: CartItem) {
    // Assuming wishlist service exists, for now just show toast
    this.toastService.showToast(`Added ${item.name} to wishlist`, 'success');
  }
}