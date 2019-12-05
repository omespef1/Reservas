import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
//providers
import {ComunicationsProvider} from '../comunications/comunications';
/*
  Generated class for the AgreementsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AgreementsProvider {

  constructor(private _comunications:ComunicationsProvider) {
   
  }
 GetAgreements(){
   return this._comunications.Get('AeOsApp/GetAeOsApp?');
 }
 GetInstitutional(){
  return this._comunications.Get('AeOsApp/GetAeOsAppInst?');
}
}
