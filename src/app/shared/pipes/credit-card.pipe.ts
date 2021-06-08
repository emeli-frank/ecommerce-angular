import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'creditCard'
})
export class CreditCardPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    let str: string = value as string;

    if (str.length != 16) {
      throw 'Credit card number expected to be 16 digits, got ${str.length} digit(s)';
    }

    let result = '';
    for (let i = 0; i < 16; i++) {
      result += str.charAt(i);
      if ((i + 1) % 4 == 0) {
        result += ' ';
      }
    }

    return result;
  }

}
