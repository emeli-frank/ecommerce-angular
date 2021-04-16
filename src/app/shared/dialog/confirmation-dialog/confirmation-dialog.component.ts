import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Dialog, DialogData as ActionDialogDialogData } from '../dialog';

export interface DialogData extends ActionDialogDialogData {
  title?: string;
  message: string | string[];
}

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.css']
})
export class ConfirmationDialogComponent extends Dialog  {

  title: string;
  message: string | string[];

  constructor(
    public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
      super(data, dialogRef);

      this.title = this.data.title;
      this.message = this.data.message;
    }


  close(value: boolean) {
    this.submit(value);
  }

}
