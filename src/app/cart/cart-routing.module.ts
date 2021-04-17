import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CartResolverService } from '../core/resolvers/cart-resolver.service';
import { CartComponent } from './cart.component';


const routes: Routes = [
  {
    path: '',
    component: CartComponent,
    resolve: {cartItems: CartResolverService}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CartRoutingModule { }
