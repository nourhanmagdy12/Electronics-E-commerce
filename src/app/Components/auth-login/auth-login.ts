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
    next: (res) => {
      this.loading = false;
      if (res?.token) {
        localStorage.setItem('token', res.token);
        // Store full user object including role
        if (res.user) {
          localStorage.setItem('user', JSON.stringify(res.user));
        } else {
          // Fallback if user not in response, but assume it is
          localStorage.setItem('user', JSON.stringify({ email: this.email, role: 'user' }));
        }
        alert('Login successful!');
        this.router.navigate(['/']);
      } else {
        alert(res?.error || 'Invalid email or password.');
      }
    },
    error: (err) => {
      this.loading = false;
      alert(err.error?.error || 'Something went wrong. Try again later.');
    }
  });
}

}
