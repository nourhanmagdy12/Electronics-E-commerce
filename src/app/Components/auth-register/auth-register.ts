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

  // ✂️ تقسيم الاسم الكامل إلى أول و آخر
  const nameParts = this.username.trim().split(' ');
  const fname = nameParts[0];
  const lname = nameParts.slice(1).join(' ') || ''; // الباقي لو فيه اسمين أو أكتر

  const newUser = {
    fname,
    lname,
    email: this.email,
    password: this.password,
    role: 'user'
  };

  this.authService.register(newUser).subscribe({
    next: (res) => {
      this.loading = false;
      alert('Account created successfully!');
      this.router.navigate(['/login']);
    },
    error: (err) => {
      this.loading = false;
      alert(err.error?.error || 'Error occurred. Try again later.');
    }
  });
}

}

