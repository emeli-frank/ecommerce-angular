import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductListResolverService } from '../core/resolvers/product-list-resolver.service';
import { ProductResolverService } from '../core/resolvers/product-resolver.service';
import { CatalogComponent } from './catalog/catalog.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';


const routes: Routes = [
  {
    path:'catalog',
    component: CatalogComponent,
    resolve: {products: ProductListResolverService},
  },
  {
    path: 'products/:productId',
    component: ProductDetailComponent,
    resolve: {product: ProductResolverService},
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CatalogRoutingModule { }
