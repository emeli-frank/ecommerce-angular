import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/core/services/product.service';
import { Product } from 'src/app/shared/models/product';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit {

  products: Product[] = [];

  constructor(private route: ActivatedRoute, private productService: ProductService) {
    this.route.data.subscribe(
      (data: {products: Product[]}) => {
        this.products = data.products;
        console.log(this.products);
      }
    );
  }

  ngOnInit(): void {
    // this.productService.getProducts().subscribe();
  }

}
