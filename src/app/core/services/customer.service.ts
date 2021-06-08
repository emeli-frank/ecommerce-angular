import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { AddressFormDialogComponent } from 'src/app/shared/components/address-form-dialog/address-form-dialog.component';
import { CartItem } from 'src/app/shared/interfaces/cart-item';
import { CreditCard } from 'src/app/shared/models/credit-card';
import { Address } from 'src/app/shared/models/interfaces/address';
import { Order, OrderJSONData } from 'src/app/shared/models/order';
import { Product, ProductJSONData } from 'src/app/shared/models/product';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient, private dialog: MatDialog) { }

  saveCreditCard(card: CreditCard): Observable<number> {
    return this.http.post(
      `${environment.apiBaseUrl}/customers/cards`,
      card.toJSON(),
    ).pipe(
      map((res: {id: number}) => res.id),
    );
  }

  getCreditCards(): Observable<any> {
    return this.http.get(`${environment.apiBaseUrl}/customers/cards`);
  }

  getCustAddress(custId: number): Observable<Address> {
    return this.http.get(`${environment.apiBaseUrl}/customers/${custId}/address`)
      .pipe(
        map((res: any) => {
          if (res) {
            const address = <Address>{
              id: res.id,
              country: res.country,
              state: res.state,
              city: res.city,
              postalCode: res.postal_code,
              address: res.address,
            }
            return address;
          } else {
            return null;
          }
        }),
      );
  }

  getCustOrders(custId: number): Observable<Order[]> {
    return this.http.get(`${environment.apiBaseUrl}/customers/${custId}/orders`)
      .pipe(
        map((res: OrderJSONData[]) => {
          return res.map(r => Order.fromJSON(r));
        }),
      );
  }

  deleteCreditCard(id: number): Observable<any> {
    return this.http.delete(`${environment.apiBaseUrl}/customers/cards/${id}`);
  }

  deleteAddress(custId: number): Observable<any> {
    return this.http.delete(`${environment.apiBaseUrl}/customers/${custId}/address`);
  }

  updateAddress(custId: number, addressToUpdate?: Address): Observable<Address> {
    let resultSubject = new Subject<Address>();
    let result$: Observable<Address> = resultSubject.asObservable();

    const dialogRef = this.dialog.open(AddressFormDialogComponent, {
      data: addressToUpdate,
      width: '85%',
      maxWidth: '600px',
    });

    const compInst = dialogRef.componentInstance;

    compInst.done.subscribe((address: Address) => {
      compInst.setBusy();
      const json = {
        id: address.id,
        country: address.country,
        state: address.state,
        city: address.city,
        postal_code: address.postalCode,
        address: address.address,
      }

      this.http.put(`${environment.apiBaseUrl}/customers/${custId}/address`, json)
        .subscribe({
          next: (_) => {
            resultSubject.next(address);
            resultSubject.complete();
            dialogRef.close();
          },
          error: err => {
            resultSubject.error(err);
            resultSubject.complete();
            compInst.setIdleWithPrimaryButtonLabel('Retry');
          }
        });
    });

    return result$;
  }
}
