import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductCartCountResolverService } from '../core/resolvers/product-cart-count-resolver.service';
import { ProductListResolverService } from '../core/resolvers/product-list-resolver.service';
import { ProductResolverService } from '../core/resolvers/product-resolver.service';
import { CatalogComponent } from './catalog/catalog.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';


const routes: Routes = [
  {
    path:'products',
    component: CatalogComponent,
    resolve: {products: ProductListResolverService},
  },
  {
    path: 'products/:productId',
    component: ProductDetailComponent,
    resolve: {
      product: ProductResolverService,
      cartCount: ProductCartCountResolverService,
    },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CatalogRoutingModule { }
