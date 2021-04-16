import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { AbstractControlOptions, FormControl, ValidatorFn } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Dialog, DialogData as ActionDialogData } from '../../dialog/dialog';

export interface DialogData extends ActionDialogData {
  title?: string;
  message?: string;
  initialData?: string;
  fieldPlaceholder?: string;
  validators?: ValidatorFn | ValidatorFn[] | AbstractControlOptions;
  errorMap?: {key: string, message: string}[],
  hint?: string;
  minLen?: number;
  maxLen?: number;
}

@Component({
  selector: 'app-prompt-dialog',
  templateUrl: './prompt-dialog.component.html',
  styleUrls: ['./prompt-dialog.component.css']
})
export class PromptDialogComponent extends Dialog implements OnInit {
  // @Output() done = new EventEmitter<string>();
  title: string;
  message: string;
  currentlyDisplayingPrimaryButtonLabel: string;
  primaryButtonLabelWhenBusy: string;
  initialData?: string;
  textControl: FormControl;
  fieldPlaceholder: string;
  validators: ValidatorFn | ValidatorFn[] | AbstractControlOptions;
  errorMap?: {key: string, message: string}[] = [];
  hint: string;
  minLen: number;
  maxLen: number;
  isBusy: boolean;

  constructor(
    public dialogRef: MatDialogRef<PromptDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
      super(data, dialogRef);
    }
  
  ngOnInit(): void {
    this.title = this.data.title;
    this.message = this.data.message;
    this.currentlyDisplayingPrimaryButtonLabel = this.primaryButtonLabel;
    this.initialData =this.data.initialData;
    this.fieldPlaceholder = this.data.fieldPlaceholder || 'Response';
    this.validators = this.data.validators || [];
    this.errorMap = this.data.errorMap || [];
    this.hint = this.data.hint;
    this.minLen = this.data.minLen;
    this.maxLen = this.data.maxLen;
    this.primaryButtonLabelWhenBusy = this.data.primaryButtonLabelWhenBusy;
    this.closeButtonLabel = this.data.closeButtonLabel || 'Close';

    this.textControl = new FormControl(this.initialData, this.validators);
    this.textControl.markAsTouched();
    this.textControl.markAsDirty();
    this.textControl.updateValueAndValidity();
  }

  submitValue() {
    /* this.done.emit(this.textControl.value);
    if (!this.closingManually) {
      this.dialogRef.close(this.textControl.value);
    } */

    this.submit(this.textControl.value);
  }

  close() {
    this.dialogRef.close();
  }

  get errors(): string[] {
    let result: string[] = [];
    for (let errorKey1 in this.textControl.errors) {
      for (let map of this.errorMap) {
        if (errorKey1 == map.key) {
          result.push(map.message);
          // break;
        }
      }
    }

    return result;
  }

  setBusy() {
    this.isBusy = true;
    if (this.primaryButtonLabelWhenBusy) {
      this.currentlyDisplayingPrimaryButtonLabel = this.primaryButtonLabelWhenBusy;
    }
  }

  setIdle() {
    this.isBusy = false;
    this.currentlyDisplayingPrimaryButtonLabel = this.primaryButtonLabel;
  }

}
