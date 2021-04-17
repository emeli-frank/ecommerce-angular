import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { EMPTY, Observable } from 'rxjs';
import { catchError, take } from 'rxjs/operators';
import { Product } from 'src/app/shared/models/product';
import { ProductService } from '../services/product.service';

@Injectable({
  providedIn: 'root'
})
export class ProductResolverService implements Resolve<Product> {

  constructor(private productService: ProductService, private route: Router) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Product | Observable<Product> | Promise<Product> {
    const productId = +route.paramMap.get('productId');
    if (isNaN(productId) || productId == 0) {
      console.error('invalid product id');
      this.route.navigate(['/catalog']);
    }
    
    return this.productService.getProduct(productId).pipe(
      take(1),
      catchError(err => {
        return EMPTY;
      })
     );
  }
}
