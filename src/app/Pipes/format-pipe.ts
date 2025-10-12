import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'cur' })
export class FormatPipe implements PipeTransform {
transform(value: number): string {
if (value == null) return '';
return '$' + value.toLocaleString(undefined, { maximumFractionDigits: 2 });
}
}