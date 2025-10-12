import { Directive, ElementRef, Input, OnInit } from '@angular/core';


@Directive({ selector: '[appLazyImg]' })
export class LazyImgDirective implements OnInit {
@Input() appLazyImg = '';
constructor(private el: ElementRef<HTMLImageElement>) {}


ngOnInit() {
const img: HTMLImageElement = this.el.nativeElement;
if ('loading' in HTMLImageElement.prototype) {
img.loading = 'lazy';
if (this.appLazyImg) img.src = this.appLazyImg;
} else {
 
setTimeout(() => img.src = this.appLazyImg, 100);
}
}
}