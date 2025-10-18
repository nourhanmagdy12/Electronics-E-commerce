import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { DataService } from './data-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private dataService: DataService) {}

  register(userData: any): Observable<any> {
    return this.dataService.getUsers().pipe(
      switchMap(users => {
        const existingUser = users.find((u: any) => u.email === userData.email);
        if (existingUser) {
          return of({ error: 'User already exists' });
        }

        const newUser = {
          id: Math.random().toString(16).slice(2, 6),  
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
    return this.dataService.getUsers().pipe(
      map(users => {
        const user = users.find(
          (u: any) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
        );

        if (user) {
          const { password: _, ...userWithoutPassword } = user;
          return {
            token: 'fake-token',
            user: userWithoutPassword
          };
        } else {
          return { error: 'Invalid email or password.' };
        }
      })
    );
  }
}
