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

}
