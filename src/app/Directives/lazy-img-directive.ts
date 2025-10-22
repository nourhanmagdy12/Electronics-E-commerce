import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({ selector: '[appLazyImg]' })
export class LazyImgDirective implements OnInit {
  @Input() appLazyImg = '';
  @Input() width?: number;
  @Input() height?: number;

  constructor(private el: ElementRef<HTMLImageElement>, private renderer: Renderer2) {}

  ngOnInit() {
    const img: HTMLImageElement = this.el.nativeElement;

    // تعيين أبعاد الصورة لو موجودة
    if (this.width) this.renderer.setAttribute(img, 'width', this.width.toString());
    if (this.height) this.renderer.setAttribute(img, 'height', this.height.toString());

    // إضافة placeholder صغير أثناء التحميل
    img.src = 'data:image/svg+xml;charset=UTF-8,<svg width="10" height="10"></svg>';

    const loadImage = () => {
      img.src = this.appLazyImg;
    };

    if ('loading' in HTMLImageElement.prototype) {
      img.loading = 'lazy';
      loadImage();
    } else if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            loadImage();
            observer.unobserve(img);
          }
        });
      });
      observer.observe(img);
    } else {
      setTimeout(loadImage, 100);
    }
  }
}
