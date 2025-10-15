import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartService } from '../../Services/cart-service';

// واجهة لبيانات تأكيد الطلب
interface OrderSummary {
  orderNumber: string;
  date: Date;
  items: any[];
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  deliveryEstimate: string;
  shippingAddress: string;
  paymentMethod: string;
}

@Component({
  selector: 'app-order-success',
  standalone: true,
  imports: [CommonModule, RouterLink, CurrencyPipe, DatePipe],
  templateUrl: './order-success.html',
  styleUrls: ['./order-success.css']
})
export class OrderSuccess implements OnInit {
  orderSummary!: OrderSummary;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    // جلب بيانات الطلب الحقيقية من CartService
    const lastOrder = this.cartService.getLastOrder();
    
    if (lastOrder) {
      this.orderSummary = lastOrder;
    } else {
      // بيانات احتياطية في حالة عدم وجود طلب محفوظ
      this.orderSummary = {
        orderNumber: '53A09B27CD1',
        date: new Date(),
        items: [],
        subtotal: 0,
        tax: 0,
        shipping: 0,
        total: 0,
        deliveryEstimate: 'Tuesday, 20 Oct, 2025',
        shippingAddress: '2118 Thornridge Cir, Syracuse, Connecticut 35624',
        paymentMethod: 'Visa **** 9530'
      };
    }
  }
}