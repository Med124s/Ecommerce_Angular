import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './component/nav-bar/nav-bar.component';
import { CategoryComponent } from './component/category/category.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductComponent } from './component/product/product.component';

import { FormsModule } from '@angular/forms';
import { AuthenticationComponent } from './component/authentication/authentication.component';
import { ProductDetailComponent } from './component/product-detail/product-detail.component';
import { EditProductComponent } from './component/edit-product/edit-product.component';
import { CaddyComponent } from './component/caddy/caddy.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    CategoryComponent,
    ProductComponent,
    AuthenticationComponent,
    ProductDetailComponent,
    EditProductComponent,
    CaddyComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
