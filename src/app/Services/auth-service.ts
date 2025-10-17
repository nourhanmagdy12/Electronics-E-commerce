// frontend/src/app/Services/auth-service.ts
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { DataService } from './data-service';

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

  constructor(private dataService: DataService) {}

  register(userData: RegisterData): Observable<any> {
    // Check if user exists in db.json via DataService
    return this.dataService.getUsers().pipe(
      switchMap(users => {
        const existingUser = users.find((u: any) => u.email === userData.email);
        if (existingUser) {
          return of({ error: 'User already exists' });
        }
        const newUser = {
          user_id: Date.now().toString(),
          username: userData.username || `${userData.fname} ${userData.lname}`,
          email: userData.email,
          password: userData.password,
          role: userData.role || 'user'
        };
        return this.dataService.addUser(newUser);
      })
    );
  }

  login(email: string, password: string): Observable<any> {
    // Login using db.json via DataService
    return this.dataService.getUsers().pipe(
      map(users => {
        const user = users.find((u: any) => u.email === email && u.password === password);
        if (user) {
          const { password: _, ...userWithoutPassword } = user;
          return { token: 'fake-token', user: userWithoutPassword };
        } else {
          return { error: 'Invalid credentials' };
        }
      })
    );
  }
}
