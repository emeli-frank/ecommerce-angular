import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Dialog, DialogData as ActionDialogDialogData } from '../dialog';

export interface DialogData extends ActionDialogDialogData {
  title?: string;
  message: string | string[];
}

@Component({
  templateUrl: './alert-dialog.component.html',
  styleUrls: ['./alert-dialog.component.css']
})
export class AlertDialogComponent extends Dialog {

  title: string;
  message: string | string[] = [];

  constructor(
    public dialogRef: MatDialogRef<AlertDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
      super(data, dialogRef);

      this.title = this.data.title;
      this.message = this.data.message;
    }


  submit2() {
    this.submit(true);
  }

}
