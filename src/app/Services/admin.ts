import { Injectable } from '@angular/core';
import { Observable, map, switchMap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { DataService } from './data-service';

@Injectable({ providedIn: 'root' })
export class AdminService {
  private api = 'http://localhost:3000';

  constructor(private http: HttpClient, private dataService: DataService) {}

  getDashboardSummary(): Observable<any> {
    return this.http.get<any[]>(`${this.api}/products`).pipe(
      map((products: any[]) => ({
        productsCount: products.length
      }))
    );
  }

  getProducts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.api}/products`);
  }

  addProduct(product: any): Observable<any> {
    return this.http.post<any>(`${this.api}/products`, product);
  }

  updateProduct(id: string, product: any): Observable<any> {
    return this.http.put<any>(`${this.api}/products/${id}`, product);
  }

  deleteProduct(id: string): Observable<any> {
    return this.http.delete<any>(`${this.api}/products/${id}`);
  }

  getCategories(): Observable<any[]> {
    return this.http.get<any[]>(`${this.api}/categories`);
  }

  addCategory(category: any): Observable<any> {
    return this.http.post<any>(`${this.api}/categories`, category);
  }

  updateCategory(id: string, category: any): Observable<any> {
    return this.http.put<any>(`${this.api}/categories/${id}`, category);
  }

  deleteCategory(id: string): Observable<any> {
    return this.http.delete<any>(`${this.api}/categories/${id}`);
  }
}
