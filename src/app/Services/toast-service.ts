import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor() { }

  showToast(message: string, type: 'success' | 'error' | 'confirm' = 'success', callback?: () => void): void {
    if (type === 'confirm') {
      if (confirm(message)) {
        callback?.();
      }
    } else {
      const toast = document.createElement('div');
      toast.className = 'toast show';
      toast.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        background: ${type === 'success' ? '#28a745' : '#dc3545'};
        color: white;
        padding: 10px 20px;
        border-radius: 5px;
        z-index: 1000;
        font-size: 14px;
      `;
      toast.textContent = message;
      document.body.appendChild(toast);
      setTimeout(() => {
        toast.remove();
      }, 3000);
    }
  }
}
