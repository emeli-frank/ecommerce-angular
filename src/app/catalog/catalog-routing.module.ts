import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductResolverService } from '../core/resolvers/product-resolver.service';
import { CatalogComponent } from './catalog/catalog.component';


const routes: Routes = [
  {
    path:'catalog',
    component: CatalogComponent,
    resolve: {products: ProductResolverService},
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CatalogRoutingModule { }
