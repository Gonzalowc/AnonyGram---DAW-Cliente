import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'thousandSuffix'
})
export class ThousandSuffixesPipePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
