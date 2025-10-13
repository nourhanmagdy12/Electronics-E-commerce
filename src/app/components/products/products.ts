import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { CartService } from '../../services/cart-service'; // تأكد من المسار الصحيح للخدمة
import { RouterLink } from '@angular/router'; // إذا كنت تستخدم توجيه للروابط
import { IProduct } from '../../iproduct';

// بيانات JSON التي أرسلتها
const PRODUCTS_DATA:IProduct[] = [
  { "id": 1, "name": "Apple iPhone 16 Pro Max 512GB", "price": 1499.99, "rating": 4.8, "reviews_count": 3210, "description": "The pinnacle of mobile technology...", "image_url": "../../assets/Apple iPhone 16 Pro Max 512GB.jpg", "manufacturer": "Apple", "full_description": "...", "specifications_json": {} },
  { "id": 2, "name": "Google Pixel 9 Pro 256GB", "price": 999.00, "rating": 4.7, "reviews_count": 2580, "description": "AI-powered phone with the best-in-class...", "image_url": "../../assets/Google Pixel 9 Pro 256GB.jpg", "manufacturer": "Google", "full_description": "...", "specifications_json": {} },
  { "id": 3, "name": "Samsung Galaxy S25 Ultra 1TB", "price": 1599.99, "rating": 4.9, "reviews_count": 4120, "description": "The ultimate Android flagship...", "image_url": "../../assets/Samsung Galaxy S25 Ultra 1TB.jpg", "manufacturer": "Samsung", "full_description": "...", "specifications_json": {} },
  { "id": 4, "name": "OnePlus 12T 5G", "price": 799.00, "rating": 4.6, "reviews_count": 1850, "description": "Fast charging and stunning display...", "image_url": "../../assets/OnePlus 12T 5G.jpg", "manufacturer": "OnePlus", "full_description": "...", "specifications_json": {} },
  { "id": 5, "name": "Xiaomi 14 Pro 512GB", "price": 899.50, "rating": 4.5, "reviews_count": 1200, "description": "Professional-grade camera system...", "image_url": "../../assets/Xiaomi 14 Pro 512GB.jpg", "manufacturer": "Xiaomi", "full_description": "...", "specifications_json": {} },
  { "id": 6, "name": "Nothing Phone (3)", "price": 650.00, "rating": 4.3, "reviews_count": 980, "description": "Unique transparent design with glyph interface...", "image_url": "../../assets/Nothing Phone (3).jpg", "manufacturer": "Nothing", "full_description": "...", "specifications_json": {} },
  { "id": 7, "name": "Motorola Edge 40 Neo", "price": 450.00, "rating": 4.1, "reviews_count": 550, "description": "Mid-range phone with premium curved display...", "image_url": "../../assets/Motorola Edge 40 Neo.jpg", "manufacturer": "Motorola", "full_description": "...", "specifications_json": {} }
];



@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, CurrencyPipe, RouterLink],
  templateUrl: './products.html',
  styleUrls: ['./products.css']
})
export class Products implements OnInit {
  products: IProduct[] = [];

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    // جلب البيانات من JSON (في التطبيق الحقيقي تكون من خلال HTTP)
    this.products = PRODUCTS_DATA.map(p => ({
      id: p.id,
      name: p.name,
      price: p.price,
      rating: p.rating,
      description: p.description,
      image_url: p.image_url
    }));
  }

  // ربط الدالة بالخدمة التي أنشأناها
  handleAddToCart(product:IProduct): void {
    this.cartService.addToCart(product);
  }
}