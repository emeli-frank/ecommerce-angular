import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Dialog } from '../../dialog/dialog';
import { Address } from '../../models/interfaces/address';

@Component({
  selector: 'app-address-form-dialog',
  templateUrl: './address-form-dialog.component.html',
  styleUrls: ['./address-form-dialog.component.scss']
})
export class AddressFormDialogComponent extends Dialog implements OnInit {

  @Input() _address: Address;
  form: FormGroup;

  get country() { return this.form.get('country') }
  get state() { return this.form.get('state') }
  get city() { return this.form.get('city') }
  get postalCode() { return this.form.get('postalCode') }
  get address() { return this.form.get('address') }

  constructor(private dialogRef: MatDialogRef<AddressFormDialogComponent>, @Inject(MAT_DIALOG_DATA) private data: Address) {
    super({
      primaryButtonLabel: data ? 'Update' : 'Done',
      primaryButtonLabelWhenBusy: data ? 'Updating...' : 'Please wait...',
      closeButtonLabel: data ? 'Cancel' : 'May be later',
      closingManually: true,
    }, dialogRef);

    this._address = data;

    this.form = new FormGroup({
      country: new FormControl(this._address ? this._address.country : ''),
      state: new FormControl(this._address ? this._address.state : ''),
      city: new FormControl(this._address ? this._address.city : ''),
      postalCode: new FormControl(this._address ? this._address.postalCode : ''),
      address: new FormControl(this._address ? this._address.address : ''),
    });
  }

  ngOnInit(): void {
  }

  submit2() {
    const address: Address = {
      country: this.country.value,
      state: this.state.value,
      city: this.city.value,
      postalCode: this.postalCode.value,
      address: this.address.value,
      id: this._address ? this._address.id : null,
    };

    this.submit(address);
  }

}
