import { Injectable } from '@angular/core';
import { caddy } from '../model/caddy.model';
import { itemProduct } from '../model/itemProduct.model';
import { productModel } from '../model/product.model';

@Injectable({
  providedIn: 'root',
})
export class CaddyService {
  currentCadyName: string = 'Caddy1';
  public caddies: Map<string, caddy> = new Map();
  constructor() {
    // Check caddy if exist in localStorage
    let caddies = localStorage.getItem('caddies');
    if (caddies) {
      this.caddies = JSON.parse(caddies);
    } else {
      // Charger default caddy (panier) Caddy1
      let panier = new caddy(this.currentCadyName);
      this.caddies.set(this.currentCadyName, panier);
    }
  }

  // Ajouter product Item to caddy

  addProductItemToCaddy(product: productModel) {
    let caddy = this.caddies.get(this.currentCadyName);
    let prodItem: itemProduct | undefined = caddy!.item.get(product.id);
    if (prodItem) {
      prodItem.quantity += product.quantity;
    } else {
      let itemP = new itemProduct();
      itemP.prix = product.currentPrice;
      itemP.quantity = product.quantity;
      itemP.product = product;
      caddy!.item.set(product.id, itemP);
    }
    this.saveCaddy();
  }
  getCurrentCady(): caddy {
    let caddies:caddy | any = this.caddies.get(this.currentCadyName);
      return caddies
  
    
  }
  // Calcul total prices
  getTotatl(): number {
    let total = 0;
    let caddy = this.caddies.get(this.currentCadyName);
    let pi: IterableIterator<itemProduct> | any = caddy?.item.values();
    for (let item of pi) {
      total += item.prix * item.quantity;
    }
    return total;
  }
  // SaveCaddy to local storage
  saveCaddy() {
    localStorage.setItem('caddies', JSON.stringify(this.caddies));
  }
}
