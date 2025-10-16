import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AdminGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      const user = JSON.parse(userStr);
      if (user.role === 'admin') return true;
      alert('Access denied. Admins only.');
      this.router.navigate(['/']);
      return false;
    }
    alert('Please login first.');
    this.router.navigate(['/login']);
    return false;
  }
}
