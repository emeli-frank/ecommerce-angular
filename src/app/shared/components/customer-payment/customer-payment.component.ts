import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { NotificationService } from 'src/app/core/services/notification.service';
import { CreditCardDialogComponent } from 'src/app/user/credit-card-dialog/credit-card-dialog.component';
import { CreditCard } from '../../models/credit-card';

@Component({
  selector: 'app-customer-payment',
  templateUrl: './customer-payment.component.html',
  styleUrls: ['./customer-payment.component.scss']
})
export class CustomerPaymentComponent implements OnInit, OnDestroy {

  @Output() created = new EventEmitter<CreditCard>();
  @Output() deleted = new EventEmitter<number>();
  @Input() cards: CreditCard[] = [];
  dialogsub: Subscription;

  constructor(private dialog: MatDialog, private ns: NotificationService, 
    iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon(
      'mastercard',
      sanitizer.bypassSecurityTrustResourceUrl('assets/svg/icons/mastercard.svg'));
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.dialogsub?.unsubscribe();
  }

  deleteCard(id: number) {
    const dialogRef = this.ns.confirmation({
      message: 'Do you really want to delete card', 
      primaryButtonLabel: 'Delete', 
    })
      .afterClosed()
      .subscribe(res => {
        if (res) {
          this.deleted.emit(id);
        }
      });
  }

  newCard() {
    const dialogRef = this.dialog.open(CreditCardDialogComponent, {
      maxWidth: '85%',
      width: '85%',
    });

    this.dialogsub = dialogRef.afterClosed().subscribe(
      card => {
        if (card) {
          this.created.emit(card);
        }
      }
    );
  }

}
