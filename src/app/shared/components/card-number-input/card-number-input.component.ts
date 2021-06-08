import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-card-number-input',
  template: `
    <div class="mb-4 card-number">
        <app-form-field>
            <input [formControl]="controls[0]" placeholder="1234">
        </app-form-field>
        <app-form-field>
            <input [formControl]="controls[1]" placeholder="5678">
        </app-form-field>
        <app-form-field>
            <input [formControl]="controls[2]" placeholder="9101">
        </app-form-field>
        <app-form-field>
            <input [formControl]="controls[3]" placeholder="1121">
        </app-form-field>
    </div>
  `,
  styles: [
    `
      .card-number {
        display: flex;
        justify-content: space-between;
      }

      .card-number > *:not(:first-child) {
            margin-left: .8rem;
      }
    `
  ]
})
export class CardNumberInputComponent implements OnInit {

  get value(): string {
    return this.controls?.map(control => control.value).join('');
  }

  @Input('value') cardNumber = '';

  controls: FormControl[] = [];

  constructor() { }

  ngOnInit(): void {
    for (let i = 0; i < 4; i++) {
      let initialStr = '';

      for (let j = 0; j < 4; j++) {
        let stringIndex = (i * 4) + j;
        console.log("i:", i, "j:", j, "stringIndex:", stringIndex);
        if (this.cardNumber.length - 1 < stringIndex ||  this.cardNumber.length == 0) {
          break;
        }

        initialStr += this.cardNumber[stringIndex];
      }

      this.controls.push(new FormControl(initialStr));
    }
  }

}
