import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'dateFormat',
  standalone: false 
})
export class DateFormatPipe implements PipeTransform {
  transform(value: any, format: string = 'dd/MM/yyyy HH:mm'): string | null {
    const datePipe = new DatePipe('en-US'); // ou outra localidade, se necessário
    return datePipe.transform(value, format);
  }
}