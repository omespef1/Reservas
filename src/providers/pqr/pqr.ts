import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ComunicationsProvider } from '../../providers/comunications/comunications';

/*
  Generated class for the PqrProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PqrProvider {

  constructor(public http: HttpClient, private _comunications: ComunicationsProvider) {
    console.log('Hello PqrProvider Provider');
  }


  GetPqr(user: any) {
    return this._comunications.Get(`pqinpqr?soc_cont=${user.Soc_cont}&sbe_cont=${user.Sbe_cont}`)
  }
}
