import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { productModel } from 'src/app/model/product.model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CataloguesService } from 'src/app/services/catalogues.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  
  constructor(
    private _service: CataloguesService,
    private _routerActivate: ActivatedRoute,
    private _router: Router,
    public authenticationService:AuthenticationService
  

  ) {}
  host: any = environment.host;
  title?:String;
  ngOnInit(): void {
    // We select product par Categories
    // We ecoute in url and doing subscribe to change dynamicly the products
    this._router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        let p1 = this._routerActivate.snapshot.params?.['p1'];
        console.log(p1);
        if (p1 == 1) {
          this.getProducts('productses/search/selectedProduct');
          this.title = "Selected";
        } else if (p1 == 2) {
          let idCategory = this._routerActivate.snapshot.params?.['p2'];
          this.getProducts('categorieses/' + idCategory + '/products');
          this.title = "Products of category" +idCategory;
        }
         else if (p1 == 3) {
          this.getProducts('productses/search/Available');
          this.title = "Product Available";
        }
         else if (p1 == 4) {
          this.title = "Promotion";
          this.getProducts('productses/search/promotion');
        }
      }
    });

    // Default affichage product selected we use parametre 1
    let p1 = this._routerActivate.snapshot.params?.['p1'];
    if (p1 == 1) {
      this.getProducts('productses/search/selectedProduct');
    }
  }
  // Method of getProduct from service catalogue
  products: any;
  getProducts(url: any) {
    return this._service.getResource(url).subscribe(
      (data) => (this.products = data),
      (err) => console.log('Error' + err)
    );
  }
  // Onload photo
  onloadPhoto:any = false;
  currentProduct:any;
  currentFileUpload:any;
  selectedFile: any;
  progress:any;
  timestamp:number=0;


  loading(p:any){
    this.currentProduct = p;
    this.onloadPhoto = true;
  }
  onSelectPhoto(event:any){
    this.selectedFile = event.target.files
    
  }
  uploadPhoto(){
  this.progress = 0;
  this.currentFileUpload = this.selectedFile.item(0);
  this._service.uploadPhotoProduct(this.currentFileUpload,this.currentProduct.id).subscribe(event =>{
    if(event.type === HttpEventType.UploadProgress){
        let total:any = event.total;
        this.progress = Math.round(100 * event.loaded /total);
      
    }else if(event instanceof HttpResponse){
      this.timestamp = Date.now();
      alert("Fin de telechargment")
     
    }
  },err=>{
    alert("Probleme de chargement")
  })

  }
  getTimestamp(){
    return this.timestamp
  }
  // detail product
  detailProduct(p:productModel){
    this._router.navigateByUrl('/detail-product/'+btoa(p._links.products.href))
  }

  
}
