import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css']
})
export class Navbar {
  search = '';
  get isRegistered(): boolean {
    return !!localStorage.getItem('user');
  }

  get isAdmin(): boolean {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      const user = JSON.parse(userStr);
      return user.role === 'admin';
    }
    return false;
  }

  constructor(private router: Router) {}

onSearch() {
  this.router.navigate(['/products'], { queryParams: { search: this.search || null } }).then(() => {
    this.search = '';
  });
}

}
