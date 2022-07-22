import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Route, Router } from '@angular/router';
import { CataloguesService } from 'src/app/services/catalogues.service';
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent implements OnInit {
  currentCategory: any;
  constructor(
    private _service: CataloguesService,
    private _router: Router,
    private _routerActivate: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getCategories();
    this._router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        let p1 = this._routerActivate.snapshot.params?.['p1'];
        if (p1 == 1) {
          this.currentCategory = undefined;
        }
      }
    });
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
}
