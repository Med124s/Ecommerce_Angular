import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { trimTrailingNulls } from '@angular/compiler/src/render3/view/util';
import { productModel } from '../model/product.model';


@Injectable({
  providedIn: 'root'
})
export class CataloguesService {

  constructor(private _http:HttpClient) { }

  getResource(url:any){
    return this._http.get(environment.host+url)
  }

  getProduct(url:any):Observable<productModel>{
    return this._http.get<productModel>(url);
  }
  uploadPhotoProduct(file:File,idProduct:number): Observable<HttpEvent<{}>>{
    let formData:FormData = new FormData();
    formData.append('file',file);
    const req = new HttpRequest('POST',environment.host+'uploadPhoto/'+idProduct,formData,{
      reportProgress:true,
      responseType:"text",
      
    })
    return this._http.request(req);
  }
}
