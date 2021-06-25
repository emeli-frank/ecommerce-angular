import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product, ProductJSONData } from 'src/app/shared/models/product';
import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Filter } from 'src/app/shared/interfaces/filter';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getProducts(filter?: Filter): Observable<Product[]> {
    const categoryParam = filter?.categoryID ? `category=${filter.categoryID}` : '';
    const minPriceParam = filter?.minPrice ? `min-price=${filter.minPrice}` : '';
    const maxPriceParam = filter?.maxPrice ? `min-price=${filter.maxPrice}` : '';
    const discountParam = filter?.discount ? `discount=${filter.discount}` : '';

    return this.http.get(
      `${environment.apiBaseUrl}/products?${categoryParam}&${minPriceParam}&${maxPriceParam}&${discountParam}`
    ).pipe(
      map((data: ProductJSONData[]) => {
        const products: Product[] = [];

        for (let p of data) {
          products.push(Product.fromJSON(p))
        }

        return products;
      })
    );
  }

  getProduct(id: number): Observable<Product> {
    return this.http.get(
      `${environment.apiBaseUrl}/products/${id}`
    ).pipe(
      map((data: ProductJSONData) => {
        return Product.fromJSON(data)
      })
    );
  }
}
