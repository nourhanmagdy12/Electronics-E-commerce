// frontend/src/app/Services/auth-service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface RegisterData {
  username?: string;
  fname?: string;
  lname?: string;
  email: string;
  password: string;
  role?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private API_URL = 'http://localhost:5000/user';

  constructor(private http: HttpClient) {}

  register(userData: RegisterData): Observable<any> {
    // إذا حابة تستخدمى fname, lname بدل username
    return this.http.post(`${this.API_URL}/register`, userData);
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.API_URL}/login`, { email, password });
  }
}
