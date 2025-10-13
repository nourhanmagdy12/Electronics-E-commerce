import { Injectable, signal, WritableSignal, computed, Signal } from '@angular/core';
import { IProduct } from '../iproduct';

// سنستخدم IProduct نفسها كعنصر في السلة
export type CartItem = IProduct;

@Injectable({
  providedIn: 'root'
})
export class CartService {
  // الحالة المخزنة للسلة
  private cartItems: WritableSignal<CartItem[]> = signal([]);

  // الإجمالي المحتسب بناءً على بياناتك
  tax: number = 50;
  shipping: number = 29;

  public items: Signal<CartItem[]> = this.cartItems.asReadonly();
  
  // الإجمالي الفرعي (Subtotal)
  public subtotal: Signal<number> = computed(() => 
    this.cartItems().reduce((sum, item) => sum + item.price * (item.quantity ?? 1), 0)
  );

  // الإجمالي الكلي (Total)
  public total: Signal<number> = computed(() =>
    this.subtotal() + this.tax + this.shipping
  );

  constructor() {
    console.log('Cart Service Initialized.');
    // تحميل بيانات افتراضية إذا كانت السلة فارغة (للتجربة)
    if (this.cartItems().length === 0) {
        this.cartItems.set([
            // تحديث البيانات لتتوافق مع واجهة IProduct الجديدة
            { 
                id: 1, 
                name: 'Apple iPhone 14 Pro Max 128Gb Deep Purple', 
                price: 1399, 
                rating: 4.8,
                reviews_count: 3210,
                description: 'The pinnacle of mobile technology...',
                image_url: '../../assets/Apple iPhone 14 Pro Max 128Gb Deep Purple.jpg',
                manufacturer: 'Apple',
                quantity: 1
            },
            { 
                id: 2, 
                name: 'AirPods Max Silver', 
                price: 549, 
                rating: 4.7,
                reviews_count: 1250,
                description: 'Premium sound quality with active noise cancellation...',
                image_url: '../../assets/AirPods Max Silver.jpg',
                manufacturer: 'Apple',
                quantity: 1
            }
        ]);
    }
  }

  // دمج مع دالة الإضافة من مكون قائمة المنتجات
  addToCart(product: IProduct): void {
    this.cartItems.update(currentItems => {
      const existingItem = currentItems.find(item => item.id === product.id);

      if (existingItem) {
        return currentItems.map(item => 
          item.id === product.id 
            ? { ...item, quantity: (item.quantity ?? 0) + 1 }
            : item
        );
      } else {
        // تأكد من أن المنتج الجديد يحتوي على كمية 1 قبل إضافته
        const newItem: CartItem = { ...product, quantity: 1 };
        return [...currentItems, newItem];
      }
    });
  }

  // زيادة الكمية
  increaseQuantity(itemToUpdate: CartItem): void {
    this.cartItems.update(currentItems => 
      currentItems.map(item => 
        item.id === itemToUpdate.id ? { ...item, quantity: (item.quantity ?? 0) + 1 } : item
      )
    );
  }

  // تقليل الكمية
  decreaseQuantity(itemToUpdate: CartItem): void {
    this.cartItems.update(currentItems => 
      currentItems.map(item => 
        item.id === itemToUpdate.id && (item.quantity ?? 0) > 1 ? { ...item, quantity: (item.quantity ?? 0) - 1 } : item
      )
    );
  }

  // إزالة العنصر
  remove(itemToRemove: CartItem): void {
    this.cartItems.update(currentItems => 
      currentItems.filter(item => item.id !== itemToRemove.id)
    );
  }
}