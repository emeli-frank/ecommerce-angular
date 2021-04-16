import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AbstractControlOptions, ValidatorFn } from '@angular/forms';
import { AlertDialogComponent, DialogData as AlertDialogData } from 'src/app/shared/dialog/alert-dialog/alert-dialog.component';
import { PromptDialogComponent, DialogData as PromptDialogData } from 'src/app/shared/components/prompt-dialog/prompt-dialog.component';
import { ConfirmationDialogComponent, DialogData as ConfirmationDialogData } from 'src/app/shared/dialog/confirmation-dialog/confirmation-dialog.component';
import { WaitComponent } from 'src/app/shared/components/wait/wait.component';

const maxDialogWidth = '600px';
@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private _dialog: MatDialog, private _snackbar: MatSnackBar) { }

  alert(data: AlertDialogData) {
    return this._dialog.open(AlertDialogComponent, {
      data: data,
      maxWidth: maxDialogWidth,
      disableClose: true,
    });
  }

  confirmation(data: ConfirmationDialogData) {
    return this._dialog.open(ConfirmationDialogComponent, {
      data: data,
      maxWidth: maxDialogWidth,
      disableClose: true,
    });
  }

  prompt(data: PromptDialogData) {
    return this._dialog.open(PromptDialogComponent, {
      data: data,
      maxWidth: maxDialogWidth,
      minWidth: '350px',
      disableClose: true,
    });
  }

  alertGenericNetworkError() {
    this._dialog.open(AlertDialogComponent, {
      data: {
        message: "Please check your internet connection and try again",
        title: "Something went wrong",
      },
      maxWidth: maxDialogWidth,
      disableClose: true,
    });
  }

  alertGenericClientError() {
    this._dialog.open(AlertDialogComponent, {
      data: {
        title: "An unexpect error has occured!",
        message: "This one is from us. Be rest assured that our team have been notified and are trying to resolve the issue.",
      },
      maxWidth: maxDialogWidth,
      disableClose: true,
    });
  }

  snackbar(msg) {
    this._snackbar.open(msg, "", {
      duration: 2000,
    })
  }

  waitDialog(message: string = 'please wait') {
    return this._dialog.open(WaitComponent, { // todo:: get waitcomponent to use this data
      data: {
        message: message,
      },
      disableClose: true,
    });
  }
}
