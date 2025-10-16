import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DataService } from '../../Services/data-service';
import { ProductUtilsService } from '../../Services/product-utils.service';
import { CartService } from '../../Services/cart-service';
import { LoadingComponent } from '../loading/loading';
import { LazyImgDirective } from '../../Directives/lazy-img-directive';

@Component({
  selector: 'app-products-page',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, LoadingComponent, LazyImgDirective],
  templateUrl: './products-page.html',
  styleUrls: ['./products-page.css']
})
export class ProductsPage implements OnInit {
  categories: any[] = [];
  allProducts: any[] = [];
  products: any[] = [];
  selectedCategory: number | null = null;
  search = '';
  sortBy = 'rating';
  loading = true;

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private router: Router,
    private productUtils: ProductUtilsService,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.dataService.getCategories().subscribe(cats => this.categories = cats);
    this.route.queryParams.subscribe(params => {
      this.selectedCategory = params['category'] ? +params['category'] : null;
      this.search = params['search'] || '';
      this.loadProducts();
    });
  }

  loadProducts() {
    this.loading = true;
    this.dataService.getProducts().subscribe(response => {
      this.allProducts = response || [];
      this.applyFilters();
      this.loading = false;
    });
  }

  applyFilters() {
    let filtered = [...this.allProducts];
    if (this.selectedCategory) {
      filtered = filtered.filter(p => p.category_id === this.selectedCategory);
    }
    if (this.search) {
      const s = this.search.toLowerCase();
      filtered = filtered.filter(
        p => (p.name && p.name.toLowerCase().includes(s)) || (p.brand && p.brand.toLowerCase().includes(s))
      );
    }
    this.products = filtered;
    this.onSortChange();
  }

  filterByCategory(catId: number | null) {
    this.router.navigate([], {
      queryParams: { category: catId, search: this.search || null },
      queryParamsHandling: 'merge'
    });
  }

  onSearch() {
    this.router.navigate([], {
      queryParams: { search: this.search || null, category: this.selectedCategory || null },
      queryParamsHandling: 'merge'
    });
  }

  onSortChange() {
    if (this.sortBy === 'price') {
      this.products = [...this.products].sort((a, b) => a.price - b.price);
    } else if (this.sortBy === 'rating') {
      this.products = [...this.products].sort((a, b) => b.rating - a.rating);
    }
  }

  goToProduct(id: number) {
    this.productUtils.goToProduct(this.router, id);
  }

  addToCart(product: any, event: MouseEvent) {
    event.stopPropagation();
    this.cartService.addToCart(product);
  }

  addToWishlist(product: any, event: MouseEvent) {
    event.stopPropagation();
    if (this.productUtils.isInWishlist(product.id)) {
      this.productUtils.removeFromWishlist(product.id);
      product.isFavorite = false;
    } else {
      this.productUtils.addToWishlist(product);
      product.isFavorite = true;
    }
  }

  ngAfterViewInit() {
    setTimeout(() => {
      const wishlist = this.productUtils.getWishlist();
      this.products.forEach(p => {
        p.isFavorite = wishlist.some(w => w.id === p.id);
      });
    }, 500);
  }

  // لازم للـ *ngFor
  trackById(index: number, item: any): any {
    return item.id;
  }
}
