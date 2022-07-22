import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationComponent } from './component/authentication/authentication.component';
import { CaddyComponent } from './component/caddy/caddy.component';
import { ProductDetailComponent } from './component/product-detail/product-detail.component';

import { ProductComponent } from './component/product/product.component';

const routes: Routes = [
  {path:'products/:p1/:p2',component:ProductComponent},
  {path:"",redirectTo:"products/1/0",pathMatch:"full"},
  {path:'login',component:AuthenticationComponent},
  {path:'detail-product/:url',component:ProductDetailComponent},
  {path:'caddy',component:CaddyComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
