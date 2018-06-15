import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {ComunicationsProvider} from '../comunications/comunications';

/*
  Generated class for the HistoryProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class HistoryProvider {

  constructor(public http: HttpClient, private _comucations:ComunicationsProvider) {
    console.log('Hello HistoryProvider Provider');
  }
GetHistory(history:any){
return  this._comucations.Get(`consumos?soc_cont=${history.Soc_cont}&sbe_cont=${history.Sbe_cont}&fac_mesp=${history.fac_mesp}&fac_anop=${history}`)
}
}
