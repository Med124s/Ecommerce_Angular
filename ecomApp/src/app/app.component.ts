import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { caddy } from './model/caddy.model';
import { AuthenticationService } from './services/authentication.service';
import { CaddyService } from './services/caddy.service';

import { CataloguesService } from './services/catalogues.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ecomApp';
  currentCategory: any;
  constructor(
    private _service: CataloguesService,
    private _router: Router,
    public authentService:AuthenticationService,
    public caddyService:CaddyService
  ) {}

  // Logout Button
  logout(){
    this.authentService.clearLocalStorage();
    this._router.navigateByUrl("/login");

  }

  checkItemProd?:boolean;
  counter:number=0;
  ngOnInit(): void {

    // // Check productItem in Caddy
    // if(this.caddyService.getCurrentCady()){
    //   this.checkItemProd = true;
    //   this.counter++;
    //   console.log(this.caddyService.caddies.get(this.caddyService.currentCadyName))
    // }
    this.caddyService.saveCaddy();
    this.authentService.loadAuthenticatedUserFromStorage();
    this.getCategories();
    
  }
  categories: any;
  getCategories() {
    return this._service
      .getResource('categorieses')
      .subscribe((data) => (this.categories = data));
  }

  getCategoryById(c: any) {
    this.currentCategory = c;
    this._router.navigateByUrl('/products/2/' + c.id);
  }
  productSelected(){
    this.currentCategory = undefined
    this._router.navigateByUrl("products/1/0");
  }
  availableProduct(){
    this.currentCategory = undefined
    this._router.navigateByUrl("products/3/0");
  }
  promotionProduct(){
    this.currentCategory = undefined
    this._router.navigateByUrl("products/4/0");
  }
  search(){}
  // Show caddy detail of itemsProduct

  detailCaddy(){
    this._router.navigateByUrl("/caddy");

  }
}
