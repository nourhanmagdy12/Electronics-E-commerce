import { Component, OnInit, computed, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CartService } from '../../Services/cart-service';
import { CartItem } from '../../Models/cart-item';
import { Router, RouterLink } from '@angular/router'; // تم التأكد من استيراد Router
import { ToastService } from '../../Services/toast-service';

// تعريف واجهات البيانات
export interface Address {
	id: number;
	label: string;
	street: string;
	cityStateZip: string;
	phone: string;
}

@Component({
	selector: 'app-checkout',
	standalone: true,
	imports: [CommonModule, FormsModule], 
	templateUrl: './checkout.html',
	styleUrl: './checkout.css'
})
export class Checkout implements OnInit {
	 
	step: WritableSignal<number> = signal(1);

 
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
 
	selectedAddressId: WritableSignal<number> = signal(1);
	selectedShippingPrice: WritableSignal<number> = signal(0);  
	cardNumber: WritableSignal<string> = signal('4085 9536 8475 9530');
	cardholderName: WritableSignal<string> = signal('');
	expDate: WritableSignal<string> = signal('');
	cvv: WritableSignal<string> = signal('');

	 
	newAddress: WritableSignal<Address> = signal({
		id: 0,
		label: 'HOME',
		street: '',
		cityStateZip: '',
		phone: ''
	});

	 
	showAddressForm: WritableSignal<boolean> = signal(false);

	 
	editingAddressId: WritableSignal<number | null> = signal(null);

	// تم حقن Router هنا
	constructor(public cartService: CartService, private router: Router, private toastService: ToastService) {}

	ngOnInit(): void {
		// Initialize estimated tax based on cart service tax
		this.estimatedTax.set(this.cartService.tax);
	}

	// الحسابات المحسوبة (computed signals)
	estimatedTax: WritableSignal<number> = signal(0); // will be set in ngOnInit
	estimatedShipping = computed(() => this.selectedShippingPrice());

	total = computed(() =>
		this.cartService.subtotal + this.estimatedTax() + this.estimatedShipping()
	);

	// الدوال للتحكم بالخطوات
	nextStep(): void {
		if (this.step() === 1 && !this.validateAddressStep()) {
			this.toastService.showToast('Please select or add an address', 'error');
			return;
		}
		if (this.step() === 2 && !this.validateShippingStep()) {
			this.toastService.showToast('Please select a shipping method', 'error');
			return;
		}
		if (this.step() < 3) {
			this.step.update(currentStep => currentStep + 1);
		}
	}

	prevStep(): void {
		if (this.step() > 1) {
			this.step.update(currentStep => currentStep - 1);
		}
	}

	validateAddressStep(): boolean {
		return this.selectedAddressId() > 0;
	}

	validateShippingStep(): boolean {
		return this.selectedShippingPrice() >= 0;
	}

	// **********************************************
	// الدالة الجديدة لإتمام الطلب والتوجيه
	// **********************************************
	completeOrder(): void {
		// 1. Check if cart is empty
		if (this.cartService.items.length === 0) {
			this.toastService.showToast('Your cart is empty', 'error');
			return;
		}

		// 2. Validate payment information
		if (!this.validatePaymentStep()) {
			this.toastService.showToast('Please fill in all payment details', 'error');
			return;
		}

		// 3. منطق التحقق من صحة الدفع يجب أن يتم هنا
		console.log("Processing Payment and Completing Order...");

		// 4. الحصول على العنوان المحدد ومعلومات الدفع
		const selectedAddress = this.getSelectedAddress();
		const addressText = selectedAddress ?
			`${selectedAddress.street}, ${selectedAddress.cityStateZip}` :
			'2118 Thornridge Cir, Syracuse, Connecticut 35624';

		const paymentMethod = `Visa **** ${this.cardNumber().slice(-4)}`;

		// 5. حفظ بيانات الطلب قبل مسح السلة
		this.cartService.saveOrderData(addressText, paymentMethod);

		// 6. محو سلة المشتريات
		this.cartService.clearCart();

		// 7. Show success message
		this.toastService.showToast('Order placed successfully!', 'success');

		// 8. التوجيه البرمجي إلى صفحة تأكيد الطلب
		this.router.navigate(['/order-success']);
	}
	// **********************************************

	validatePaymentStep(): boolean {
		return this.cardNumber().trim() !== '' &&
			   this.cardholderName().trim() !== '' &&
			   this.expDate().trim() !== '' &&
			   this.cvv().trim() !== '';
	}

	// دالة إضافة عنوان جديد
	addNewAddress(): void {
		if (!this.newAddress().street.trim() || !this.newAddress().cityStateZip.trim() || !this.newAddress().phone.trim()) {
			this.toastService.showToast('Please fill in all address fields', 'error');
			return;
		}
		const newId = Math.max(0, ...this.addresses().map(a => a.id)) + 1;
		const addressToAdd = { ...this.newAddress(), id: newId };

		this.addresses.update(currentAddresses => [...currentAddresses, addressToAdd]);
		this.selectedAddressId.set(newId);
		this.toastService.showToast('Address added successfully', 'success');
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

	// محاكاة إدخال رقم البطاقة لتحديث شكل البطاقة
	onCardNumberInput(event: Event): void {
		const input = (event.target as HTMLInputElement).value.replace(/\s/g, ''); // إزالة المسافات
		const formatted = input.replace(/(.{4})/g, '$1 ').trim(); // إضافة مسافة كل 4 أرقام
		this.cardNumber.set(formatted.substring(0, 19)); // تقييد الإدخال
	}
}
