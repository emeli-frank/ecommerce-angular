import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './components/product-list/product-list.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    ProductListComponent,
  ],
  imports: [
    CommonModule,
    // RouterModule,
  ],
  exports: [
    ProductListComponent,
  ]
})
export class SharedModule { }
