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
  role = 'user';  
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
    password: this.password,
    role: this.role
  };

  this.authService.register(newUser).subscribe({
    next: (res) => {
      this.loading = false;
      if (res.user_id) {
        alert('Account created successfully!');
        this.router.navigate(['/login']);
      } else {
        alert(res.error || 'Error occurred. Try again later.');
      }
    },
    error: (err) => {
      this.loading = false;
      alert(err.error?.error || 'Error occurred. Try again later.');
    }
  });
}

}

