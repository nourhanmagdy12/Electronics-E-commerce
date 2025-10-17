import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  // Generic methods for localStorage operations
  getItem(key: string): any {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }

  setItem(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  // Specific methods for common data
  getUsers(): any[] {
    return this.getItem('users') || [];
  }

  setUsers(users: any[]): void {
    this.setItem('users', users);
  }

  getProducts(): any[] {
    return this.getItem('products') || [];
  }

  setProducts(products: any[]): void {
    this.setItem('products', products);
  }

  getCategories(): any[] {
    return this.getItem('categories') || [];
  }

  setCategories(categories: any[]): void {
    this.setItem('categories', categories);
  }

  getOrders(): any[] {
    return this.getItem('orders') || [];
  }

  setOrders(orders: any[]): void {
    this.setItem('orders', orders);
  }

  getCurrentUser(): any {
    return this.getItem('currentUser');
  }

  setCurrentUser(user: any): void {
    this.setItem('currentUser', user);
  }

  // Helper methods for CRUD operations
  addToArray(key: string, item: any): void {
    const array = this.getItem(key) || [];
    array.push(item);
    this.setItem(key, array);
  }

  updateInArray(key: string, id: number, updatedItem: any): void {
    const array = this.getItem(key) || [];
    const index = array.findIndex((item: any) => item.id === id);
    if (index !== -1) {
      array[index] = { ...array[index], ...updatedItem };
      this.setItem(key, array);
    }
  }

  removeFromArray(key: string, id: number): void {
    const array = this.getItem(key) || [];
    const filtered = array.filter((item: any) => item.id !== id);
    this.setItem(key, filtered);
  }
}
