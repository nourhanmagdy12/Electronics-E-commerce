import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-profile.html',
  styleUrls: ['./user-profile.css']
})
export class UserProfileComponent implements OnInit {
  user: any = null;

  constructor(private router: Router) {}

  ngOnInit() {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      this.user = JSON.parse(storedUser);
    } else {
      this.router.navigate(['/login']);
    }
  }

  logout() {
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
}
