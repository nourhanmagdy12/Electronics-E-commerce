import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartService } from '../../Services/cart-service';
import { DataService } from '../../Services/data-service';
import { ToastService } from '../../Services/toast-service';

 
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

interface OrderStatus {
  status: string;
  description: string;
  timestamp: Date;
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
  orderStatuses: OrderStatus[] = [
    { status: 'Processing', description: 'Your order is being processed', timestamp: new Date() },
    { status: 'Shipped', description: 'Your order has been shipped', timestamp: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000) },
    { status: 'Delivered', description: 'Your order has been delivered', timestamp: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000) }
  ];
  showOrderDetails: boolean = false;

  constructor(private cartService: CartService, private dataService: DataService, private toastService: ToastService) {}

  ngOnInit(): void {
    // Simulate email confirmation
    this.toastService.showToast('Order confirmation email sent!', 'success');

    const lastOrder = this.cartService.getLastOrder();

    if (lastOrder) {
      this.orderSummary = lastOrder;

      // Post order to server
      this.dataService.addOrder({
        id: Date.now().toString(),
        ...lastOrder,
        date: lastOrder.date.toISOString()
      }).subscribe({
        next: () => {
          console.log('Order saved to server');
        },
        error: (err) => {
          console.error('Error saving order to server:', err);
        }
      });
    } else {

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