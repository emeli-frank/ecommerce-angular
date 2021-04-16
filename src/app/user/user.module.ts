import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { UserEditDialogComponent } from './user-edit-dialog/user-edit-dialog.component';
import { CreditCardDialogComponent } from './credit-card-dialog/credit-card-dialog.component';


@NgModule({
  declarations: [UserDashboardComponent, UserEditDialogComponent, CreditCardDialogComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule,
  ]
})
export class UserModule { }
