import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminService } from '../../Services/admin';
import { DataService } from '../../Services/data-service';
import { ToastService } from '../../Services/toast-service';
import { LocalStorageService } from '../../Services/local-storage-service';

import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, CurrencyPipe,RouterModule, FormsModule],
  templateUrl: './admin.html',
  styleUrls: ['./admin.css']
})
export class DashboardComponent implements OnInit {


  loading = true;

  products: any[] = [];
  categories: any[] = [];

  showAddProductForm = false;
  showAddCategoryForm = false;

  newProduct = { name: '', price: 0, category_id: 0, image_url: '', description: '', rating: 0, reviews_count: 0, manufacturer: '', model_number: '', full_description: '', specifications_json: {} };
  newCategory = { category_name: '', description: '', icon: '' };

  isEditingProduct = false;
  editingProduct: any = {};

  isEditingCategory = false;
  editingCategory: any = {};



  constructor(private adminService: AdminService, private dataService: DataService, private router: Router, private toastService: ToastService, private localStorageService: LocalStorageService) { }

  showToast(message: string, type: 'success' | 'error' | 'confirm' = 'success', callback?: () => void): void {
    this.toastService.showToast(message, type, callback);
  }

  ngOnInit(): void {
    this.loadDashboardData();
    this.loadProducts();
    this.loadCategories();
  }

  loadProducts(): void {
    this.adminService.getProducts().subscribe((products: any[]) => {
      this.products = products || [];
    });
  }

  loadCategories(): void {
    this.adminService.getCategories().subscribe((categories: any[]) => {
      this.categories = categories || [];
    });
  }

  loadDashboardData(): void {
    this.adminService.getDashboardSummary().subscribe({
      next: (res: any) => {
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading dashboard summary:', err);
        this.loading = false;
      }
    });
  }

  getCategoryName(categoryId: number): string {
    const category = this.categories.find(cat => cat.category_id === categoryId);
    return category ? category.category_name : 'Unknown';
  }

  addProduct(): void {
    if (this.newProduct.name && this.newProduct.price && this.newProduct.category_id && this.newProduct.image_url) {
      const newProd = { ...this.newProduct, id: Date.now().toString() };
      this.adminService.addProduct(newProd).subscribe({
        next: () => {
          this.newProduct = { name: '', price: 0, category_id: 0, image_url: '', description: '', rating: 0, reviews_count: 0, manufacturer: '', model_number: '', full_description: '', specifications_json: {} };
          this.showAddProductForm = false;
          this.loadProducts();
          this.loadDashboardData();
          this.showToast('Product added successfully!', 'success');
        },
        error: (err) => {
          console.error('Error adding product:', err);
          this.showToast('Failed to add product!', 'error');
        }
      });
    } else {
      this.showToast('Please fill all fields!', 'error');
    }
  }

  editProduct(product: any): void {
    this.isEditingProduct = true;
    this.editingProduct = { ...product };
  }

  saveProductEdit(): void {
    if (this.editingProduct.name && this.editingProduct.price && this.editingProduct.category_id && this.editingProduct.image_url && this.editingProduct.rating && this.editingProduct.reviews_count && this.editingProduct.description && this.editingProduct.manufacturer && this.editingProduct.model_number && this.editingProduct.full_description && this.editingProduct.specifications_json) {
      this.adminService.updateProduct(this.editingProduct.id, {
        name: this.editingProduct.name,
        price: parseFloat(this.editingProduct.price),
        category_id: this.editingProduct.category_id,
        image_url: this.editingProduct.image_url,
        rating: this.editingProduct.rating,
        reviews_count: this.editingProduct.reviews_count,
        description: this.editingProduct.description,
        manufacturer: this.editingProduct.manufacturer,
        model_number: this.editingProduct.model_number,
        full_description: this.editingProduct.full_description,
        specifications_json: this.editingProduct.specifications_json
      }).subscribe({
        next: () => {
          this.loadProducts();
          this.isEditingProduct = false;
          this.editingProduct = {};
          this.showToast('Product updated successfully!', 'success');
        },
        error: (err) => {
          console.error('Error updating product:', err);
          this.showToast('Failed to update product!', 'error');
        }
      });
    } else {
      this.showToast('Please fill all fields!', 'error');
    }
  }

  cancelProductEdit(): void {
    this.isEditingProduct = false;
    this.editingProduct = {};
  }

  deleteProduct(id: string): void {
    this.showToast('Are you sure you want to delete this product?', 'confirm', () => {
      this.adminService.deleteProduct(id).subscribe({
        next: () => {
          this.loadProducts();
          this.loadDashboardData();
          this.showToast('Product deleted successfully!', 'success');
        },
        error: (err) => {
          console.error('Error deleting product:', err);
          this.showToast('Failed to delete product!', 'error');
        }
      });
    });
  }

  addCategory(): void {
    if (this.newCategory.category_name && this.newCategory.description && this.newCategory.icon) {
      const newCat = { ...this.newCategory, id: Date.now().toString() };
      this.adminService.addCategory(newCat).subscribe({
        next: () => {
          this.newCategory = { category_name: '', description: '', icon: '' };
          this.showAddCategoryForm = false;
          this.loadCategories();
          this.showToast('Category added successfully!', 'success');
        },
        error: (err) => {
          console.error('Error adding category:', err);
          this.showToast('Failed to add category!', 'error');
        }
      });
    } else {
      this.showToast('Please fill all fields!', 'error');
    }
  }

  editCategory(category: any): void {
    this.isEditingCategory = true;
    this.editingCategory = { ...category };
  }

  saveCategoryEdit(): void {
    if (this.editingCategory.category_name && this.editingCategory.description && this.editingCategory.icon) {
      this.adminService.updateCategory(this.editingCategory.id, {
        category_name: this.editingCategory.category_name,
        description: this.editingCategory.description,
        icon: this.editingCategory.icon
      }).subscribe({
        next: () => {
          this.loadCategories();
          this.isEditingCategory = false;
          this.editingCategory = {};
          this.showToast('Category updated successfully!', 'success');
        },
        error: (err) => {
          console.error('Error updating category:', err);
          this.showToast('Failed to update category!', 'error');
        }
      });
    } else {
      this.showToast('Please fill all fields!', 'error');
    }
  }

  cancelCategoryEdit(): void {
    this.isEditingCategory = false;
    this.editingCategory = {};
  }

  deleteCategory(id: string): void {
    this.showToast('Are you sure you want to delete this category?', 'confirm', () => {
      this.adminService.deleteCategory(id).subscribe({
        next: () => {
          this.loadCategories();
          this.showToast('Category deleted successfully!', 'success');
        },
        error: (err) => {
          console.error('Error deleting category:', err);
          this.showToast('Failed to delete category!', 'error');
        }
      });
    });
  }
}
