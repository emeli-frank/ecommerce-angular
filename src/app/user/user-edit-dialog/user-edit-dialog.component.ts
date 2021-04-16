import { Component, Inject, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Dialog } from 'src/app/shared/dialog/dialog';
import { User } from 'src/app/shared/models/user';

@Component({
  selector: 'app-user-edit-dialog',
  templateUrl: './user-edit-dialog.component.html',
  styleUrls: ['./user-edit-dialog.component.scss']
})
export class UserEditDialogComponent extends Dialog implements OnInit {

  user: User;

  form: FormGroup;

  get firstName() { return this.form.get('firstName') }

  get lastName() { return this.form.get('lastName') }

  get email() { return this.form.get('email') }

  constructor(private dialogRef: MatDialogRef<UserEditDialogComponent>, @Inject(MAT_DIALOG_DATA) private data: User) {
    super({primaryButtonLabel: 'Update', primaryButtonLabelWhenBusy: 'Updating...', closingManually: true}, dialogRef);
  }

  ngOnInit(): void {
    this.user = this.data;

    this.form = new FormGroup({
      firstName: new FormControl(this.user.firstName, [
        Validators.required,
        Validators.maxLength(32),
      ]),
      lastName: new FormControl(this.user.lastName, [
        Validators.required,
        Validators.maxLength(32),
      ]),
      email: new FormControl(this.user.email, [
        Validators.required,
        Validators.maxLength(128),
        Validators.email,
      ])
    });
  }

  submit2() {
    const user = this.user.new();
    user.firstName = this.firstName.value;
    user.lastName = this.lastName.value;
    user.email = this.email.value;

    this.submit(user);
  }

}
