import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DataService } from '../../Services/data-service';
import { ProductUtilsService } from '../../Services/product-utils.service';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './product-details.html',
  styleUrls: ['./product-details.css']
})
export class ProductDetails implements OnInit {
  product: any = null;
  related: any[] = [];
  mainSpecs: { label: string, value: any }[] = [];
  stars = Array(5);
  staticReviews = [
    { author: 'Grace Carey', date: '24 January,2023', text: 'This phone has IT storage and is durable. Plus all the new iPhones have a C port! Apple is phasing out the current ones! (All about the Benjamins) So if you want a phone that’s going to last grab an iPhone 14 pro max and get several cords and plugs.' },
    { author: 'Ronald Richards', date: '24 January,2023', text: 'I was a bit nervous to be buying a secondhand phone from Amazon, but I couldn’t be happier with my purchase! It was super easy to set up and the phone works and looks great. It truly was in excellent condition. Highly recommend!!' },
    { author: 'Darcy King', date: '24 January,2023', text: 'I might be the only one to say this but the camera is a little funky. Hoping it will change with a software update; otherwise, love this phone! Came in great condition.' }
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