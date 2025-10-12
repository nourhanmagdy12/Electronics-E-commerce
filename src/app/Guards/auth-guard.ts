import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    if (localStorage.getItem('user')) {
      return true;  
    }

    alert('Please register or login first to access this page.');  
    this.router.navigate(['/login']);  
    return false;
  }
}

