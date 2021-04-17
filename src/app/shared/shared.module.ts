import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './components/product-list/product-list.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { DialogScaffoldComponent } from './dialog/dialog-scaffold/dialog-scaffold.component';
import { PromptDialogComponent } from './components/prompt-dialog/prompt-dialog.component';
import { ConfirmationDialogComponent } from './dialog/confirmation-dialog/confirmation-dialog.component';
import { AlertDialogComponent } from './dialog/alert-dialog/alert-dialog.component';
import { WaitComponent } from './components/wait/wait.component';
import { LoadingComponent } from './components/loading/loading.component';
import { CustomerPaymentComponent } from './components/customer-payment/customer-payment.component';
import { AddressFormDialogComponent } from './components/address-form-dialog/address-form-dialog.component';



@NgModule({
  declarations: [
    ProductListComponent,
    DialogScaffoldComponent,
    WaitComponent,
    PromptDialogComponent,
    ConfirmationDialogComponent,
    AlertDialogComponent,
    LoadingComponent,
    CustomerPaymentComponent,
    AddressFormDialogComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    // RouterModule,
  ],
  exports: [
    ProductListComponent,
    MaterialModule,
    ReactiveFormsModule,
    DialogScaffoldComponent,
    WaitComponent,
    PromptDialogComponent,
    ConfirmationDialogComponent,
    AlertDialogComponent,
    LoadingComponent,
    CustomerPaymentComponent,
  ]
})
export class SharedModule { }
