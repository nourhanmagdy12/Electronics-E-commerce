import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { DataService } from '../../Services/data-service';
import { ProductUtilsService } from '../../Services/product-utils.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class Home implements OnInit {
  categories: any[] = [];
  products: any[] = [];

  constructor(
    private dataService: DataService,
    private router: Router,
    private productUtils: ProductUtilsService
  ) {}

  ngOnInit() {
    this.loadCategories();
    this.loadProducts();
  }

  loadCategories() {
    this.dataService.getCategories().subscribe({
      next: cats => (this.categories = cats),
      error: err => console.error('Error loading categories:', err)
    });
  }

  loadProducts() {
    this.dataService.getProducts({ _sort: 'id', _order: 'desc' })
      .subscribe({
        next: products => {
          this.products = products.map(p => ({
            ...p,
            isFavorite: this.productUtils.isInWishlist(p.product_id)
          }));
        },
        error: err => console.error('Error loading products:', err)
      });
  }

  filterByCategory(catId: number) {
    this.router.navigate(['/products'], { queryParams: { category: catId } });
  }

  toggleWishlist(product: any) {
    this.productUtils.addToWishlist(product);
    product.isFavorite = this.productUtils.isInWishlist(product.id);
  }

  isInWishlist(product: any): boolean {
    return this.productUtils.isInWishlist(product.id);
  }
}
