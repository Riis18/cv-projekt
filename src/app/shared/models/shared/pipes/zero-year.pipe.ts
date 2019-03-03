import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'zeroYear'
})
export class ZeroYearPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return value === 0 ? '' : value;
  }

}
