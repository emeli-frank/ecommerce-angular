import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { CustomerService } from 'src/app/core/services/customer.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { UserService } from 'src/app/core/services/user.service';
import { CreditCard } from 'src/app/shared/models/credit-card';
import { User } from 'src/app/shared/models/user';
import { CreditCardDialogComponent } from '../credit-card-dialog/credit-card-dialog.component';
import { UserEditDialogComponent } from '../user-edit-dialog/user-edit-dialog.component';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss']
})
export class UserDashboardComponent implements OnInit, OnDestroy {

  user: User;
  dialogsub: Subscription;
  creditCards: CreditCard[] = [];

  constructor(
    private authService: AuthService, 
    private dialog: MatDialog, 
    private userService: UserService, 
    private custService: CustomerService,
    private ns: NotificationService) { }

  ngOnInit(): void {
    this.user = this.authService.user;
    this.custService.getCreditCards().subscribe({
      next: cards => this.creditCards = cards,
      error: err => console.error(err),
    });
  }

  ngOnDestroy(): void {
    this.dialogsub?.unsubscribe();
  }

  edit() {
    const dialogRef = this.dialog.open(UserEditDialogComponent, {
      data: this.user,
    });

    this.dialogsub = dialogRef.componentInstance.done.subscribe(
      user => {
        dialogRef.componentInstance.setBusy();
        this.userService.updateUser(user).subscribe({
          next: _ => {
            console.log('updated');
            this.authService.updateUser(user);
            this.user = user;
            dialogRef.close();
          },

          error: err => {
            console.error(err);
            dialogRef.componentInstance.setIdleWithPrimaryButtonLabel('Retry');
          }
        });
      }
    );
  }

  newCard() {
    const dialogRef = this.dialog.open(CreditCardDialogComponent, {});

    this.dialogsub = dialogRef.componentInstance.done.subscribe(
      card => {
        dialogRef.componentInstance.setBusy();
        this.custService.saveCreditCard(card).subscribe({
          next: id => {
            card.id = id;
            this.creditCards.push(card);
            dialogRef.close();
          },

          error: err => {
            console.error(err);
            dialogRef.componentInstance.setIdleWithPrimaryButtonLabel('Retry');
          }
        });
      }
    );
  }

  deleteCard(id: number) {
    const dialogRef = this.ns.confirmation({
      message: 'Do you really want to delete card', 
      primaryButtonLabel: 'Delete', 
      primaryButtonLabelWhenBusy: 'Deleting...',
      closingManually: true,
    });

    dialogRef.componentInstance.done
      .subscribe(res => {
        if (res) {
          dialogRef.componentInstance.setBusy();
          this.custService.deleteCreditCard(id).subscribe({
            next: _ => {
              this.creditCards = this.creditCards.filter(card => card.id != id);
              this.ns.snackbar("Card was deleted");
              dialogRef.componentInstance.setIdle();
              dialogRef.close();
            }, 
      
            error: err => {
              this.ns.alertGenericNetworkError();
              dialogRef.componentInstance.setIdle();
              dialogRef.close();
            }
          });
        }
      });
  }

}
