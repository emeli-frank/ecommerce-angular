import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CatalogRoutingModule } from './catalog-routing.module';
import { CatalogComponent } from './catalog/catalog.component';
import { SharedModule } from '../shared/shared.module';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { FilterDialogComponent } from './filter-dialog/filter-dialog.component';


@NgModule({
  declarations: [CatalogComponent, ProductDetailComponent, FilterDialogComponent],
  imports: [
    CommonModule,
    CatalogRoutingModule,
    SharedModule,
  ]
})
export class CatalogModule { }
