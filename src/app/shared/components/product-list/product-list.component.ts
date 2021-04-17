import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from '../../models/product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  @Input() products: Product[] = [];
  @Output() clicked = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  emitClick(id: number) {
    this.clicked.emit(id);
  }

}
