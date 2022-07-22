import { Component, OnInit } from '@angular/core';
import { itemProduct } from 'src/app/model/itemProduct.model';
import { CaddyService } from 'src/app/services/caddy.service';

@Component({
  selector: 'app-caddy',
  templateUrl: './caddy.component.html',
  styleUrls: ['./caddy.component.css']
})
export class CaddyComponent implements OnInit {

  constructor(public caddyService:CaddyService) { }

  ngOnInit(): void {

  }
  bindItemProduct:any;
  getItems(){
    let pt:IterableIterator<itemProduct> |undefined =  this.caddyService.getCurrentCady()?.item.values();
    return pt
  }

}
