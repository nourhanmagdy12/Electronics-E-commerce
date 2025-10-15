import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DataService } from '../../Services/data-service';
import { ProductUtilsService } from '../../Services/product-utils.service';
import { LoadingComponent } from '../loading/loading';


@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, RouterModule, LoadingComponent],
  templateUrl: './product-details.html',
  styleUrls: ['./product-details.css']
})
export class ProductDetails implements OnInit {
  product: any = null;
  related: any[] = [];
  mainSpecs: { label: string, value: any }[] = [];
  stars = Array(5);
  loading = true;
  ratingBreakdown = [
  { label: 'Excellent', percent: 90, count: 100 },
  { label: 'Good', percent: 75, count: 11 },
  { label: 'Average', percent: 40, count: 3 },
  { label: 'Below Average', percent: 20, count: 8 },
  { label: 'Poor', percent: 10, count: 1 },
];

staticReviews = [
  {
    author: 'Grace Carey',
    date: '10 June, 2025',
    rating: 4,
    text: 'I was a bit nervous to be buying a secondhand phone but everything is PERFECT! Easy setup and great quality. Highly recommend!',
    image: 'https://randomuser.me/api/portraits/men/8.jpg',
  },
  {
    author: 'Ronald Richards',
    date: '4 March, 2025',
    rating: 5,
    text: 'This phone has great performance and durable design. Definitely a worthy purchase!',
    image: 'https://randomuser.me/api/portraits/men/19.jpg',
  },
  {
    author: 'Darcy King',
    date: '24 September, 2024',
    rating: 4,
    text: 'The only thing is the camera feels a bit funky. Otherwise, I love this phone!',
    image: 'https://randomuser.me/api/portraits/women/2.jpg',
    
  },
];

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private router: Router,
    private productUtils: ProductUtilsService
  ) {}

  ngOnInit() {

    this.route.params.subscribe(params => {
      const id = +params['id'];
      if (!id) return;
      
      this.dataService.getProductById(id).subscribe(prod => {
        if (!prod || Object.keys(prod).length === 0) {
          this.product = null;
          return;
        }
        this.loading = false;
        this.product = prod;
        this.prepareMainSpecs();
        this.loadRelated();
      });
    });
  }

prepareMainSpecs() {
  if (!this.product || !this.product.specifications_json) {
    this.mainSpecs = [];
    return;
  }
  this.mainSpecs = [
    { label: 'Display', value: this.product.specifications_json['Display'] },
    { label: 'Chip', value: this.product.specifications_json['Chip'] },
    { label: 'Storage', value: this.product.specifications_json['Storage'] },
    { label: 'Camera', value: this.product.specifications_json['Camera'] }
  ].filter(spec => spec.value);
}

loadRelated() {
  if (!this.product) return;
  this.dataService.getProducts({ category_id: this.product.category_id })
    .subscribe(products => {
      this.related = (products || []).filter((p: any) => p.id !== this.product.id);
    });
}


  get specKeys() {
    return this.product && this.product.specifications_json
      ? Object.keys(this.product.specifications_json)
      : [];
  }

  round(val: number): number {
    return Math.round(val);
  }

  addToWishlist(product: any) {
    this.productUtils.addToWishlist(product);
  }

  goToProduct(id: number) {
    this.productUtils.goToProduct(this.router, id);
  }
}