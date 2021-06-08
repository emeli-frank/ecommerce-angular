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
import { UserAvatarComponent } from './components/user-avatar/user-avatar.component';
import { BackdropComponent } from './components/backdrop/backdrop.component';
import { Card1Component } from './components/card1/card1.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { RatingComponent } from './components/rating/rating.component';
import { ProductCarouselComponent } from './product-carousel/product-carousel.component';
import { ScrollDotsComponent } from './scroll-dots/scroll-dots.component';
import { Card2Component } from './components/card2/card2.component';
import { FormFieldComponent } from './components/form/form-field/form-field.component';
import { ProductCard2Component } from './components/product-card2/product-card2.component';
import { ItemCountButtonComponent } from './components/item-count-button/item-count-button.component';
import { CardNumberInputComponent } from './components/card-number-input/card-number-input.component';
import { CreditCardPipe } from './pipes/credit-card.pipe';



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
    UserAvatarComponent,
    BackdropComponent,
    Card1Component,
    ProductCardComponent,
    RatingComponent,
    ProductCarouselComponent,
    ScrollDotsComponent,
    Card2Component,
    FormFieldComponent,
    ProductCard2Component,
    ItemCountButtonComponent,
    CardNumberInputComponent,
    CreditCardPipe,
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
    UserAvatarComponent,
    BackdropComponent,
    Card1Component,
    ProductCardComponent,
    RatingComponent,
    ProductCarouselComponent,
    ScrollDotsComponent,
    Card2Component,
    FormFieldComponent,
    ProductCard2Component,
    ItemCountButtonComponent,
    CardNumberInputComponent,
    CreditCardPipe,
  ]
})
export class SharedModule { }
