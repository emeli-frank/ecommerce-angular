import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { CustomerService } from 'src/app/core/services/customer.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { UserService } from 'src/app/core/services/user.service';
import { AddressFormDialogComponent } from 'src/app/shared/components/address-form-dialog/address-form-dialog.component';
import { CreditCard } from 'src/app/shared/models/credit-card';
import { Address } from 'src/app/shared/models/interfaces/address';
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
  cards: CreditCard[] = [];
  address: Address;

  constructor(
    private authService: AuthService, 
    private dialog: MatDialog, 
    private userService: UserService, 
    private custService: CustomerService,
    private ns: NotificationService) { }

  ngOnInit(): void {
    this.user = this.authService.user;
    this.custService.getCreditCards().subscribe({
      next: cards => this.cards = cards,
      error: err => console.error(err),
    });

    // get address
    this.custService.getCustAddress(this.user.id).subscribe({
      next: res => {
        this.address = res;
        console.log(res);
      },
      error: err => {
        console.error(err);
        this.ns.alertGenericNetworkError();
      },
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

  newCard(card: CreditCard) {
    const dialogRef = this.ns.waitDialog();
    this.custService.saveCreditCard(card).subscribe({
      next: id => {
        card.id = id;
        this.cards.push(card);
        dialogRef.close();
      },

      error: err => {
        console.error(err);
        dialogRef.close();
      }
    });
  }

  deleteCard(id: number) {
    const dialogRef = this.ns.waitDialog();
    this.custService.deleteCreditCard(id).subscribe({
      next: _ => {
        this.cards = this.cards.filter(card => card.id != id);
        this.ns.snackbar("Card was deleted");
        dialogRef.close();
      }, 

      error: err => {
        this.ns.alertGenericNetworkError();
        dialogRef.close();
      }
    });
  }

  deleteAddress() {
    const dialogRef = this.ns.confirmation({
      title: 'Do you really want to remove your default shipping address?',
      message: 'You will be prompted to enter a shipping address each time you make an order.',
      primaryButtonLabel: 'Delete', 
      primaryButtonLabelWhenBusy: 'Deleting...',
      closingManually: true,
    });
    
    dialogRef.componentInstance.done.subscribe(res => {
        if (res) {
          dialogRef.componentInstance.setBusy();
          this.custService.deleteAddress(this.user.id).subscribe({
            next: _ => {
              this.ns.snackbar('Address removed');
              this.address = null;
              dialogRef.close();
            },
            error: err => {
              console.error(err);
              this.ns.alertGenericNetworkError();
              dialogRef.componentInstance.setIdle();
            }
          });
        }
      });
  }

  updateAddress(address?: Address) {
    this.custService.updateAddress(this.user.id, address)
      .subscribe({
        next: address => {
          this.address = address;
          this.ns.snackbar('Address updated!');
        },
        error: err => {
          this.ns.alertGenericNetworkError();
        }
      });
  }

}
