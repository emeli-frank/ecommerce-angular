import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { CartItem } from 'src/app/shared/interfaces/cart-item';
import { User } from 'src/app/shared/models/user';
import { AuthService } from '../services/auth.service';
import { CustomerService } from '../services/customer.service';

@Injectable({
  providedIn: 'root'
})
export class CartResolverService implements Resolve<CartItem[]> {

  constructor(private custService: CustomerService, private authService: AuthService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): CartItem[] | Observable<CartItem[]> | Promise<CartItem[]> {
    const user = this.authService.user;
    return this.custService.getCartItems(user.id).pipe(take(1));
  }
}
