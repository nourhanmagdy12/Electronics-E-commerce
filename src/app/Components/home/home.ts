import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { DataService } from '../../Services/data-service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class Home implements OnInit {
  categories: any[] = [];
 wishlist: any[] = [];
  products: any[] = [];


  constructor(private dataService: DataService, private router: Router) {}

ngOnInit() {

    this.dataService.getCategories().subscribe({
      next: cats => (this.categories = cats),
      error: err => console.error('Error loading categories:', err)
    });

    this.dataService.getProducts({ _sort: 'id', _order: 'desc', _limit: 8 })
      .subscribe({
        next: products => {
          console.log('Products loaded:', products);
          this.products = products;
        },
        error: err => console.error('Error loading products:', err)
      });
  }

  filterByCategory(catId: number) {
    this.router.navigate(['/products'], { queryParams: { category: catId } });
  }


  toggleWishlist(product: any) {
    const index = this.wishlist.findIndex(p => p.id === product.id);
    if (index !== -1) {
      this.wishlist.splice(index, 1);
    } else {
      this.wishlist.push(product);
    }
    localStorage.setItem('wishlist', JSON.stringify(this.wishlist));
  }

  isInWishlist(product: any): boolean {
    return this.wishlist.some(p => p.id === product.id);
  }

  loadWishlist() {
    const saved = localStorage.getItem('wishlist');
    if (saved) {
      this.wishlist = JSON.parse(saved);
    }
  }
}