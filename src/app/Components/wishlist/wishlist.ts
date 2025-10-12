import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductUtilsService } from '../../Services/product-utils.service';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './wishlist.html',
  styleUrls: ['./wishlist.css']
})
export class Wishlist implements OnInit {
  wishlist: any[] = [];

  constructor(private router: Router, private productUtils: ProductUtilsService) {}

  ngOnInit() {
    this.loadWishlist();
  }

  loadWishlist() {
    this.wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
  }

  goToProduct(id: number) {
    this.productUtils.goToProduct(this.router, id);
  }

  removeFromWishlist(productId: number, event: MouseEvent) {
    event.stopPropagation();

    this.wishlist = this.wishlist.filter(p => p.id !== productId);
    localStorage.setItem('wishlist', JSON.stringify(this.wishlist));

    
    let allProducts = JSON.parse(localStorage.getItem('allProducts') || '[]');
    allProducts = allProducts.map((p: any) =>
      p.id === productId ? { ...p, isFavorite: false } : p
    );
    localStorage.setItem('allProducts', JSON.stringify(allProducts));
  }
}
