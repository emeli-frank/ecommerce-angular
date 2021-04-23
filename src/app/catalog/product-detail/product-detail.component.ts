import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { CartService } from 'src/app/core/services/cart.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { Product } from 'src/app/shared/models/product';
import { User } from 'src/app/shared/models/user';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
  host: {'class': 'py-page-content'},
})
export class ProductDetailComponent implements OnInit {

  user: User;
  product: Product;

  constructor(private route: ActivatedRoute, private ns: NotificationService, 
    private authService: AuthService, private cartService: CartService) { }

  ngOnInit(): void {
    this.user = this.authService.user;

    this.route.data.subscribe((data: {product: Product}) => {
      if (!data.product) {
        this.ns.alert({message: "Product does not exist"});
      } else {
        this.product = data.product;
        console.log(this.product);
      }
    });
  }

  addItemToCart() {
    this.cartService.addToCard(this.user.id, this.product.id).subscribe({
      next: _ => {
        this.ns.snackbar('Added to card');
      },
      error: err => {
        this.ns.alertGenericNetworkError();
        console.error(err);
      }
    });
  }

}
