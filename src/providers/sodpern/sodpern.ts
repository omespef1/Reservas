import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ComunicationsProvider } from '../comunications/comunications';

/*
  Generated class for the SodpernProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SodpernProvider {

  constructor(public http: HttpClient,private _comu:ComunicationsProvider) {
    console.log('Hello SodpernProvider Provider');
  }

  deleteSoDpern(emp_codi:number, dpe_proy:number){
    return this._comu.Get(`SoDpern/Delete?emp_codi=${emp_codi}&dpe_proy=${dpe_proy}`,true,'Borrando...',false)
    
  }
}
