import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { productModel } from 'src/app/model/product.model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CaddyService } from 'src/app/services/caddy.service';
import { CataloguesService } from 'src/app/services/catalogues.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent implements OnInit {
  constructor(
    public authenticationService: AuthenticationService,
    private router: Router,
    private routerActivate: ActivatedRoute,
    private _service: CataloguesService,
    public caddyService:CaddyService
  ) {}
  currentProduct: any;
  host: any = environment.host;
  timeStamp: number = 0;
  onloadPhoto?: boolean;
  ngOnInit(): void {
    if (this.mode === 1) {
      this.router.navigateByUrl('');
    }

    let proUrl = this.routerActivate.snapshot.params?.['url'];
    this._service.getProduct(atob(proUrl)).subscribe(
      (data) => (this.currentProduct = data),
      (err) => console.log('error')
    );
  }

  getTimestamp() {
    return this.timeStamp;
  }
  // Onload photo

  currentFileUpload: any;
  selectedFile: any;
  progress: any;
  timestamp: number = 0;

  loading(p: any) {
    this.currentProduct = p;
    this.onloadPhoto = true;
  }
  onSelectPhoto(event: any) {
    this.selectedFile = event.target.files;
  }
  uploadPhoto() {
    this.progress = 0;
    this.currentFileUpload = this.selectedFile.item(0);
    this._service
      .uploadPhotoProduct(this.currentFileUpload, this.currentProduct.id)
      .subscribe(
        (event) => {
          if (event.type === HttpEventType.UploadProgress) {
            let total: any = event.total;
            this.progress = Math.round((100 * event.loaded) / total);
          } else if (event instanceof HttpResponse) {
            this.timestamp = Date.now();
            alert('Fin de telechargment');
          }
        },
        (err) => {
          alert('Probleme de chargement');
        }
      );
  }
  //  Update Current Product with change mode interface
  mode?: number;
  onUpdateProduct(p: productModel) {
    this.mode = 1;
  }
  saveUpdate() {
    this.mode = 0;
  }

  // add to panier
  onCaddy(currentProduct: productModel) {
    this.caddyService.addProductItemToCaddy(currentProduct)
  }
}
