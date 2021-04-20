import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { CartItem } from 'src/app/shared/interfaces/cart-item';
import { Product } from 'src/app/shared/models/product';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private numberOfItemsSubject = new Subject<number>();
  private numberOfItems$: Observable<number>;

  constructor(private http: HttpClient) {
    this.numberOfItems$ = this.numberOfItemsSubject.asObservable();
  }

  addToCard(userId: number, productId: number): Observable<any> {
    return this.http.post(
      `${environment.apiBaseUrl}/customers/${userId}/cart`,
      {product_id: productId},
    ).pipe(
      map((res: {count: number}) => this.numberOfItemsSubject.next(res.count))
    );
  }

  getCartItems(custId: number): Observable<CartItem[]> {
    return this.http.get(`${environment.apiBaseUrl}/customers/${custId}/cart`)
      .pipe(
        map((res: any) => {
          return res.map(r => <CartItem>{
            quantity: r.quantity,
            product: Product.fromJSON(r.product),
          });
        }),
      );
  }

  getCartItemCount(custId: number): Observable<number> {
    this.http.get(`${environment.apiBaseUrl}/customers/${custId}/cart/count`)
      .subscribe({
        next: (res: {count: number}) => {
          this.numberOfItemsSubject.next(res.count);
        },
        error: err => {
          this.numberOfItemsSubject.error(err);
        }
      });

    return this.numberOfItems$;
  }

}
