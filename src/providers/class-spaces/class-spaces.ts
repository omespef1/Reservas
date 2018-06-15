import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {ComunicationsProvider} from '../comunications/comunications'
/*
  Generated class for the ClassSpacesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ClassSpacesProvider {

  constructor(public http: HttpClient,private _comunications:ComunicationsProvider) {
    console.log('Hello ClassSpacesProvider Provider');
  }
GetClassSpaces(){
 return  this._comunications.Get('aeclase');
}
}
