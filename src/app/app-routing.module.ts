import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';


const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
  },
  {
    path: '',
    loadChildren: () => import('./catalog/catalog.module').then(m => m.CatalogModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
