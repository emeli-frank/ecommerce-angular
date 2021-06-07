import { Component, Input, OnInit } from '@angular/core';
import { CartItem } from '../../interfaces/cart-item';
import { Product } from '../../models/product';

@Component({
  selector: 'app-product-card2',
  templateUrl: './product-card2.component.html',
  styleUrls: ['./product-card2.component.scss']
})
export class ProductCard2Component implements OnInit {

  @Input() cartItem: CartItem;

  constructor() { }

  ngOnInit(): void {
  }

}
