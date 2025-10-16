import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'cur' })
export class FormatPipe implements PipeTransform {
  transform(value: number, currency: string = '$'): string {
    if (value == null) return '';
    return currency + value.toLocaleString(undefined, { maximumFractionDigits: 2 });
  }
}
