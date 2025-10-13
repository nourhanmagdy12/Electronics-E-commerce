import { Component, WritableSignal, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../services/cart-service';
import { IProduct } from '../../iproduct';

// تعريف واجهات البيانات
export interface Address {
  id: number;
  label: string;
  street: string;
  cityStateZip: string;
  phone: string;
}

@Component({
  selector: 'app-Checkout',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './checkout.html',
  styleUrls: ['./checkout.css']
})
export class Checkout {
  // حالة الخطوة الحالية
  step: WritableSignal<number> = signal(1);

  // بيانات العناوين
  addresses: WritableSignal<Address[]> = signal([
    {
      id: 1,
      label: 'HOME',
      street: '2118 Thornridge Clr',
      cityStateZip: 'Syracuse, Connecticut 35624',
      phone: '(208) 555-0104'
    },
    {
      id: 2,
      label: 'OFFICE',
      street: '2715 Ash Dr',
      cityStateZip: 'San Jose, South Dakota 83475',
      phone: '(704) 555-0127'
    },
  ]);

  // العنوان المحدد (الذي تم اختياره)
  selectedAddressId: WritableSignal<number> = signal(1);
  
  // طريقة الشحن المحددة (سعرها)
  selectedShippingPrice: WritableSignal<number> = signal(0); // 0 for Free
  
  // بيانات الدفع (لمحاكاة شكل البطاقة)
  cardNumber: WritableSignal<string> = signal('4085 9536 8475 9530');
  cardholderName: WritableSignal<string> = signal('');
  expDate: WritableSignal<string> = signal('');
  cvv: WritableSignal<string> = signal('');

  // نموذج العنوان الجديد
  newAddress: WritableSignal<Address> = signal({
    id: 0,
    label: 'HOME',
    street: '',
    cityStateZip: '',
    phone: ''
  });

  // حالة إظهار نموذج العنوان الجديد
  showAddressForm: WritableSignal<boolean> = signal(false);
  
  // حالة تحرير العنوان
  editingAddressId: WritableSignal<number | null> = signal(null);

  constructor(public cartService: CartService) {}

  // الحسابات المحسوبة (computed signals)
  estimatedTax: WritableSignal<number> = signal(0); // will be set in ngOnInit
  estimatedShipping = computed(() => this.selectedShippingPrice());

  total = computed(() =>
    this.cartService.subtotal() + this.estimatedTax() + this.estimatedShipping()
  );

  // الدوال للتحكم بالخطوات
  nextStep(): void {
    if (this.step() < 3) {
      this.step.update(currentStep => currentStep + 1);
    }
  }

  prevStep(): void {
    if (this.step() > 1) {
      this.step.update(currentStep => currentStep - 1);
    }
  }

  // دالة إضافة عنوان جديد
  addNewAddress(): void {
    const newId = Math.max(0, ...this.addresses().map(a => a.id)) + 1;
    const addressToAdd = { ...this.newAddress(), id: newId };
    
    this.addresses.update(currentAddresses => [...currentAddresses, addressToAdd]);
    this.selectedAddressId.set(newId);
    this.resetAddressForm();
  }

  // دالة إعادة تعيين نموذج العنوان
  resetAddressForm(): void {
    this.newAddress.set({
      id: 0,
      label: 'HOME',
      street: '',
      cityStateZip: '',
      phone: ''
    });
    this.showAddressForm.set(false);
    this.editingAddressId.set(null);
  }

  // دالة تحرير عنوان
  editAddress(address: Address): void {
    this.newAddress.set({ ...address });
    this.editingAddressId.set(address.id);
    this.showAddressForm.set(true);
  }

  // دالة حفظ تحرير العنوان
  saveEditedAddress(): void {
    const editedAddress = this.newAddress();
    
    this.addresses.update(currentAddresses => 
      currentAddresses.map(addr => 
        addr.id === this.editingAddressId() ? editedAddress : addr
      )
    );
    
    this.resetAddressForm();
  }

  // دالة حذف عنوان
  deleteAddress(addressId: number): void {
    this.addresses.update(currentAddresses => 
      currentAddresses.filter(addr => addr.id !== addressId)
    );
    
    // إذا تم حذف العنوان المحدد، اختر العنوان الأول
    if (this.selectedAddressId() === addressId && this.addresses().length > 0) {
      this.selectedAddressId.set(this.addresses()[0].id);
    }
  }

  // دالة الحصول على العنوان المحدد
  getSelectedAddress(): Address | undefined {
    return this.addresses().find(addr => addr.id === this.selectedAddressId());
  }

  // دالة وهمية لإتمام الطلب
  placeOrder(): void {
    alert('Order Placed!');
  }

  // محاكاة إدخال رقم البطاقة لتحديث شكل البطاقة
  onCardNumberInput(event: Event): void {
    const input = (event.target as HTMLInputElement).value.replace(/\s/g, ''); // إزالة المسافات
    const formatted = input.replace(/(.{4})/g, '$1 ').trim(); // إضافة مسافة كل 4 أرقام
    this.cardNumber.set(formatted.substring(0, 19)); // تقييد الإدخال
  }
}