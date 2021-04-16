import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Dialog } from 'src/app/shared/dialog/dialog';
import { CreditCard } from 'src/app/shared/models/credit-card';

@Component({
  selector: 'app-credit-card-dialog',
  templateUrl: './credit-card-dialog.component.html',
  styleUrls: ['./credit-card-dialog.component.scss']
})
export class CreditCardDialogComponent extends Dialog implements OnInit {

  form: FormGroup;

  get name() { return this.form.get('name') }

  get number() { return this.form.get('number') }

  get cvc() { return this.form.get('cvc') }

  get expiryDate() { return this.form.get('expiryDate') }

  constructor(dialogRef: MatDialogRef<CreditCardDialogComponent>/* , @Inject(MAT_DIALOG_DATA) private data: CreditCard */) {
    super({
      primaryButtonLabel: 'Add', 
      primaryButtonLabelWhenBusy: 'Adding...', 
      closingManually: true,
    }, 
    dialogRef);
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.maxLength(64),
      ]),
      number: new FormControl('', [
        Validators.required,
      ]),
      cvc: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(3),
      ]),
      expiryDate: new FormControl('', [
        Validators.required,
      ]),
    });
  }

  submit2() {
    let card = new CreditCard(null, this.name.value, this.number.value, this.cvc.value, new Date(this.expiryDate.value))
    this.submit(card);
  }

}
