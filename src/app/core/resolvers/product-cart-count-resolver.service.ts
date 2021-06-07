import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { take } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { CartService } from '../services/cart.service';
import { NotificationService } from '../services/notification.service';

@Injectable({
  providedIn: 'root'
})
export class ProductCartCountResolverService implements Resolve<number> {

  constructor(private cartService: CartService, private authService: AuthService, private ns: NotificationService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): number | Observable<number> | Promise<number> {
    const custId = this.authService.user.id;

    const productId = +route.paramMap.get('productId');

    if (!productId || isNaN(productId)) {
      this.ns.alert({
        title: 'Could not open resource', 
        message: 'The resource id is not valid. Please check your url and try again',
      });
      return throwError('Error getting route');
    }

    return this.cartService.getCartItemCount2(custId, productId).pipe(
      take(1),
    );
  }
}
