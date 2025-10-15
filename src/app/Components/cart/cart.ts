import { Component } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterOutlet } from "@angular/router";
import { CartService } from '../../Services/cart-service'; // استيراد الخدمة
import { CartItem } from '../../Models/cart-item';

@Component({
  selector: 'app-cart',
  standalone: true,
  // إضافة CurrencyPipe لتنسيق الأسعار
  imports: [CommonModule, FormsModule, RouterLink, CurrencyPipe],
  templateUrl: './cart.html',
  styleUrls: ['./cart.css']
})
// غيرت اسم الفئة من 'cart' إلى 'Cart' ليتوافق مع تسمية Angular القياسية
export class cart {
  
  // استخدام الخدمة للوصول إلى حالة السلة والحسابات
  items;
  subtotal;
  tax;
  shipping;
  total;

  constructor(private cartService: CartService) {
    // تهيئة المتغيرات في البناء
    this.items = this.cartService.items;
    this.subtotal = this.cartService.subtotal;
    this.tax = this.cartService.tax;
    this.shipping = this.cartService.shipping;
    this.total = this.cartService.total;
  }

  increase(item: CartItem) {
    this.cartService.increaseQuantity(item);
  }

  decrease(item: CartItem) {
    this.cartService.decreaseQuantity(item);
  }

  remove(item: CartItem) {
    this.cartService.remove(item);
  }
}