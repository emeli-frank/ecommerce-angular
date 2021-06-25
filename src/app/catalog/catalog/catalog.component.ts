import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FilterService } from 'src/app/core/services/filter.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { ProductService } from 'src/app/core/services/product.service';
import { Filter } from 'src/app/shared/interfaces/filter';
import { Product } from 'src/app/shared/models/product';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss'],
  host: {'class': 'py-page-content'},
})
export class CatalogComponent implements OnInit {

  products: Product[] = [];
  filter: Filter;

  get filterCount(): number {
    let count = 0;

    for (let key in this.filter) {
      if (this.filter[key]) {
        count++
      }
    }

    return count;
  }

  constructor(private route: ActivatedRoute, private router: Router, private ns: NotificationService,
    private filterService: FilterService, private productService: ProductService) {
    // get data from contructor
    this.route.data.subscribe(
      (data: {products: Product[]}) => {
        this.products = data.products;
      }
    );

    // update UI when params change
    this.route.queryParamMap.subscribe(params => {
      const waitDialogRef = this.ns.waitDialog('Loading products');
      this.filter = this.filterFromQueryParams(params['params']);
      this.productService.getProducts(this.filter)
        .subscribe({
          next: products => {
            this.products = products;
            waitDialogRef.close();
          },
          error: err => {
            console.error(err);
            waitDialogRef.close();
            this.ns.alertGenericNetworkError();
          }
        });
    });
  }

  ngOnInit(): void { }

  onProductClick(productId: number) {
    this.router.navigate(['/products/' + productId], {relativeTo: this.route});
  }

  addToCart(event: PointerEvent) {
    event.stopPropagation();
    console.log(event);
  }

  showFilter(advanced = false) {
    this.filterService.showFilter(this.filter, advanced)
      .subscribe(
        filter => {
          this.updateQueryParams(filter);
        }
      );
  }

  private filterFromQueryParams(params: Map<string, string>): Filter {
    const filter: Filter = {}

    const search = params['search'];
    const minPrice = +params['min-price'];
    const maxPrice = +params['max-price'];
    const discount = +params['discount'];

    if (search) {
      filter.search = search;
    }

    if (minPrice) {
      filter.minPrice = minPrice;
    }

    if (maxPrice) {
      filter.maxPrice = maxPrice;
    }

    if (discount) {
      filter.discount = discount;
    }

    return filter;
  }

  private updateQueryParams(filter: Filter): void {
    const params = {};

    if (filter.search) {
      params['search'] = filter.search
    }

    if (filter.minPrice) {
      params['min-price'] = filter.minPrice
    }

    if (filter.maxPrice) {
      params['max-price'] = filter.maxPrice
    }

    if (filter.discount) {
      params['discount'] = filter.discount
    }

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: params,
      replaceUrl: true,
    });
  }

}
