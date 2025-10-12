import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../Services/auth-service'; 

@Component({
  selector: 'app-auth-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './auth-login.html',
  styleUrls: ['./auth-login.css']
})
export class AuthLoginComponent {
  email = '';
  password = '';
  loading = false;

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    if (!this.email || !this.password) {
      alert('Please fill in all fields.');
      return;
    }

    this.loading = true;
    this.authService.login(this.email, this.password).subscribe({
      next: (user) => {
        this.loading = false;
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          alert('Login successful!');
          this.router.navigate(['/']);
        } else {
          alert('Invalid email or password.');
        }
      },
      error: () => {
        this.loading = false;
        alert('Something went wrong. Try again later.');
      }
    });
  }
}
