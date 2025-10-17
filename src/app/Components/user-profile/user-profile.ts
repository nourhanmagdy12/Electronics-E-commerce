import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { DataService } from '../../Services/data-service';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-profile.html',
  styleUrls: ['./user-profile.css']
})
export class UserProfileComponent implements OnInit {
  user: any = null;

  constructor(private router: Router, private dataService: DataService) {}

  ngOnInit() {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      // Fetch full user details from db.json
      this.dataService.getUser(userData.user_id).subscribe({
        next: (fullUser) => {
          this.user = fullUser;
        },
        error: (err) => {
          console.error('Error fetching user data:', err);
          this.user = userData; // Fallback to localStorage
        }
      });
    } else {
      this.router.navigate(['/login']);
    }
  }

 logout() {
  if (confirm('Are you sure you want to logout?')) {
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
}

}
