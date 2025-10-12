import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../Services/data-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})
export class Header implements OnInit {
  categories: any[] = [];

  constructor(private dataService: DataService, private router: Router) {}

  ngOnInit() {
    this.dataService.getCategories().subscribe(cats => this.categories = cats);
  }

  filterByCategory(category_id: number) {
    this.router.navigate(['/products'], { queryParams: { category: category_id } });
  }
}
