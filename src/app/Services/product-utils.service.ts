import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class ProductUtilsService {
  private wishlistKey = 'wishlist';

  constructor() {}

  addToWishlist(product: any) {
    const wishlist = JSON.parse(localStorage.getItem(this.wishlistKey) || '[]');
    const exists = wishlist.find((p: any) => p.id === product.id);

    if (!exists) {
      wishlist.push(product);
      product.isFavorite = true;
    } else {
      const index = wishlist.findIndex((p: any) => p.id === product.id);
      wishlist.splice(index, 1);
      product.isFavorite = false;
    }

    localStorage.setItem(this.wishlistKey, JSON.stringify(wishlist));
  }

  removeFromWishlist(productId: number) {
    let wishlist = this.getWishlist();
    wishlist = wishlist.filter((p: any) => p.id !== productId);
    localStorage.setItem(this.wishlistKey, JSON.stringify(wishlist));
  }

  getWishlist(): any[] {
    return JSON.parse(localStorage.getItem(this.wishlistKey) || '[]');
  }

  isInWishlist(productId: number): boolean {
    const wishlist = this.getWishlist();
    return wishlist.some((p: any) => p.id === productId);
  }

  goToProduct(router: Router, id: number) {
    router.navigate(['/products', id]); 
  }
}
