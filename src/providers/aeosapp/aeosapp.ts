import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ComunicationsProvider } from '../comunications/comunications';

/*
  Generated class for the AeosappProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AeosappProvider {

  constructor(private _comunications:ComunicationsProvider) {
    console.log('Hello AeosappProvider Provider');
  }
GetNews(emp_codi:number){
  return this._comunications.Get(`AeOsApp/GetAeOsAppByType?emp_codi=${emp_codi}osa_tipo=T&osa_mapp=A`,false,'',true);
}

}
