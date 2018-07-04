import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
//providers
import {ComunicationsProvider} from '../comunications/comunications';

/*
  Generated class for the ProductsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ProductsProvider {

  constructor(public http: HttpClient,private _comunications:ComunicationsProvider) {
    console.log('Hello ProductsProvider Provider');
  }

GetProducts(classSpace:any){
  return this._comunications.Get(`producto?Cla_cont=${classSpace.Cla_cont}`);
}
setProducto(product:any){
  if(product.esp_mdit =="N"){

  }
}
}
