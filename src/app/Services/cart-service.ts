import { Injectable } from '@angular/core';
import { CartItem } from '../Models/cart-item';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartKey = 'cartItems';
  private lastOrderKey = 'lastOrder';
  private _items: CartItem[] = [];
  private _subtotal = 0;
  private _tax = 0;
  private _shipping = 5; // Default shipping cost
  private _total = 0;

  // Observables for reactive updates
  private cartItemsSubject = new BehaviorSubject<CartItem[]>([]);
  private subtotalSubject = new BehaviorSubject<number>(0);
  private totalSubject = new BehaviorSubject<number>(0);

  constructor() {
    this.loadCart();
    this.calculateTotals();
  }

  // Getters for cart data
  get items(): CartItem[] {
    return this._items;
  }

  get subtotal(): number {
    return this._subtotal;
  }

  get tax(): number {
    return this._tax;
  }

  get shipping(): number {
    return this._shipping;
  }

  get total(): number {
    return this._total;
  }

  // Load cart from localStorage
  private loadCart(): void {
    const savedCart = localStorage.getItem(this.cartKey);
    if (savedCart) {
      this._items = JSON.parse(savedCart);
      this.cartItemsSubject.next(this._items);
    }
  }

  // Save cart to localStorage
  private saveCart(): void {
    localStorage.setItem(this.cartKey, JSON.stringify(this._items));
    this.cartItemsSubject.next(this._items);
  }

  // Calculate totals
  private calculateTotals(): void {
    this._subtotal = this._items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    this._tax = this._subtotal * 0.1; // 10% tax
    this._total = this._subtotal + this._tax + this._shipping;
    
    this.subtotalSubject.next(this._subtotal);
    this.totalSubject.next(this._total);
  }

  // Add item to cart
  addToCart(product: any): void {
    const existingItem = this._items.find(item => item.id === product.id);
    
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      const newItem: CartItem = {
        id: product.id,
        name: product.name,
        price: product.price,
        image_url: product.image_url,
        quantity: 1
      };
      this._items.push(newItem);
    }
    
    this.saveCart();
    this.calculateTotals();
  }

  // Increase item quantity
  increaseQuantity(item: CartItem): void {
    const cartItem = this._items.find(i => i.id === item.id);
    if (cartItem) {
      cartItem.quantity += 1;
      this.saveCart();
      this.calculateTotals();
    }
  }

  // Decrease item quantity
  decreaseQuantity(item: CartItem): void {
    const cartItem = this._items.find(i => i.id === item.id);
    if (cartItem) {
      cartItem.quantity -= 1;
      
      if (cartItem.quantity <= 0) {
        this.remove(item);
      } else {
        this.saveCart();
        this.calculateTotals();
      }
    }
  }

  // Remove item from cart
  remove(item: CartItem): void {
    const index = this._items.findIndex(i => i.id === item.id);
    if (index !== -1) {
      this._items.splice(index, 1);
      this.saveCart();
      this.calculateTotals();
    }
  }

  // Save order data before clearing cart
  saveOrderData(shippingAddress: string = '', paymentMethod: string = ''): any {
    const orderData = {
      orderNumber: this.generateOrderNumber(),
      date: new Date(),
      items: [...this._items],
      subtotal: this._subtotal,
      tax: this._tax,
      shipping: this._shipping,
      total: this._total,
      shippingAddress: shippingAddress || '2118 Thornridge Cir, Syracuse, Connecticut 35624',
      paymentMethod: paymentMethod || 'Visa **** 9530',
      deliveryEstimate: this.calculateDeliveryDate()
    };
    
    localStorage.setItem(this.lastOrderKey, JSON.stringify(orderData));
    return orderData;
  }

  // Get last order data
  getLastOrder(): any {
    const savedOrder = localStorage.getItem(this.lastOrderKey);
    return savedOrder ? JSON.parse(savedOrder) : null;
  }

  // Generate order number
  private generateOrderNumber(): string {
    return Math.random().toString(36).substr(2, 9).toUpperCase();
  }

  // Calculate delivery date (5-7 business days)
  private calculateDeliveryDate(): string {
    const today = new Date();
    const deliveryDate = new Date(today);
    deliveryDate.setDate(today.getDate() + 7);
    
    return deliveryDate.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  }

  // Clear cart
  clearCart(): void {
    this._items = [];
    this.saveCart();
    this.calculateTotals();
  }
}
