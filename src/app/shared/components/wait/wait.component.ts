import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-wait',
  templateUrl: './wait.component.html',
  styleUrls: ['./wait.component.scss']
})
export class WaitComponent {

  message: string = 'please wait';

  constructor(public dialogRef: MatDialogRef<WaitComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { 
    if (data.message && data.message != '') {
      this.message = data.message;
    }
  }

}
