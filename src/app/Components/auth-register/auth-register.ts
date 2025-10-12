import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../Services/auth-service';

@Component({
  selector: 'app-auth-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './auth-register.html',
  styleUrls: ['./auth-register.css']
})
export class AuthRegisterComponent {
  username = '';
  email = '';
  password = '';
  confirmPassword = '';
  loading = false;

  constructor(private router: Router, private authService: AuthService) {}

  register() {
    if (!this.username || !this.email || !this.password || !this.confirmPassword) {
      alert('Please fill in all fields.');
      return;
    }

    if (this.password !== this.confirmPassword) {
      alert('Passwords do not match.');
      return;
    }

    this.loading = true;
    const newUser = {
      username: this.username,
      email: this.email,
      password: this.password
    };

    this.authService.register(newUser).subscribe({
      next: () => {
        this.loading = false;
        alert(`Welcome, ${this.username}! Your account has been created successfully.`);
        this.router.navigate(['/login']);
      },
      error: () => {
        this.loading = false;
        alert('Error occurred while creating your account. Try again later.');
      }
    });
  }
}

