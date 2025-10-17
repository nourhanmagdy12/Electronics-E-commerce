import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IProduct } from '../Models/iproduct';
import { ICategory } from '../Models/icategory';

@Injectable({ providedIn: 'root' })
export class DataService {
  private api = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  
  getCategories(): Observable<ICategory[]> {
    return this.http.get<ICategory[]>(`${this.api}/categories`);
  }

  getCategoryById(category_id: number): Observable<ICategory> {
    return this.http.get<ICategory>(`${this.api}/categories/${category_id}`);
  }

  
  getProducts(params: any = {}): Observable<IProduct[]> {
    let httpParams = new HttpParams();
    Object.keys(params).forEach(key => {
      if (params[key] !== null && params[key] !== undefined) {
        httpParams = httpParams.set(key, params[key]);
      }
    });
    return this.http.get<IProduct[]>(`${this.api}/products`, { params: httpParams });
  }

getProductById(id: number): Observable<any> {
  return this.http.get<any>(`http://localhost:3000/products/${id}`);
}

getOrders(): Observable<any[]> {
  return this.http.get<any[]>(`${this.api}/orders`);
}

addOrder(order: any): Observable<any> {
  return this.http.post<any>(`${this.api}/orders`, order);
}

updateOrder(id: number, order: any): Observable<any> {
  return this.http.put<any>(`${this.api}/orders/${id}`, order);
}

deleteOrder(id: number): Observable<any> {
  return this.http.delete<any>(`${this.api}/orders/${id}`);
}

getUsers(): Observable<any[]> {
  return this.http.get<any[]>(`${this.api}/users`);
}

addUser(user: any): Observable<any> {
  return this.http.post<any>(`${this.api}/users`, user);
}

getUser(id: string): Observable<any> {
  return this.http.get<any>(`${this.api}/users/${id}`);
}

}
