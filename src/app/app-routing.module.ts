import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { EditProductsComponent } from './edit-products/edit-products.component';
import { ProductComponent } from './product/product.component';
import { ProductsComponent } from './products/products.component';

const routes: Routes = [
   {path: 'edit', component: EditProductsComponent},
   { path: '', redirectTo: '/products', pathMatch: 'full' },
   {path: 'products', component: ProductsComponent},
   {path: 'product', component: ProductComponent},


]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
