import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private api = 'http://localhost:3000/users';

  constructor(private http: HttpClient) {}

  register(user: any): Observable<any> {
    return this.http.post(this.api, user);
  }

  login(email: string, password: string): Observable<any> {
    return this.http.get<any[]>(`${this.api}?email=${email}&password=${password}`)
      .pipe(map(users => {
        if (users.length > 0) {
          const u = users[0];
          return {
            user_id: u.user_id,  
            email: u.email,
            username: u.username
          };
        }
        return null;
      }));
  }
}
