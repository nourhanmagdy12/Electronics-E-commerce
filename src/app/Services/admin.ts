import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AdminService {
  private baseUrl = 'http://localhost:5000/dash/admin';

  constructor(private http: HttpClient) {}

  private getAuthHeaders() {
    const token = localStorage.getItem('token'); // JWT مخزن في localStorage
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      })
    };
  }

  getDashboardSummary(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/summary`, this.getAuthHeaders());
  }
}
