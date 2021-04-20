import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { CartItem } from 'src/app/shared/interfaces/cart-item';
import { User } from 'src/app/shared/models/user';
import { AuthService } from '../services/auth.service';
import { CartService } from '../services/cart.service';

@Injectable({
  providedIn: 'root'
})
export class CartResolverService implements Resolve<CartItem[]> {

  constructor(private authService: AuthService, private cartService: CartService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): CartItem[] | Observable<CartItem[]> | Promise<CartItem[]> {
    const user = this.authService.user;
    return this.cartService.getCartItems(user.id).pipe(take(1));
  }
}
