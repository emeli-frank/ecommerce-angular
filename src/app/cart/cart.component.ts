import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { AuthService } from '../core/services/auth.service';
import { CartService } from '../core/services/cart.service';
import { CartItem } from '../shared/interfaces/cart-item';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  host: {'class': 'py-page-content'},
})
export class CartComponent implements OnInit {

  private cartItemCountSub = new Subject<number>();
  cartItemCount$: Observable<number>;
  cartItems: CartItem[] = [];
  custId: number;

  constructor(private route: ActivatedRoute, private cartService: CartService, private authService: AuthService) { }

  ngOnInit(): void {
    // get cust id
    this.custId = this.authService.user.id;

    // set cart item count
    this.cartItemCount$ = this.cartItemCountSub.asObservable();
    this.route.data.subscribe((data: {cartItems: any}) => {
      this.cartItems = data.cartItems;
    });

    this.cartService.getCartItemCount(this.custId).subscribe(count => this.cartItemCountSub.next(count));
  }

  onQuantityChanged(event: number, productId: number) {
    console.log(productId);
    // todo:: remove this amount from cart
  }

}
