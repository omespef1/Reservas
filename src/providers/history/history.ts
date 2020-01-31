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
    
  }
GetHistory(emp_codi:number,soc_cont:number,sbe_cont:number, mac_nume:string, fac_mesp:number,fac_anop:number, fac_nechI:number, fac_nechF:number,pvt_cont:number){
return  this._comucations.Get(`consumos?soc_cont=${soc_cont}&sbe_cont=${sbe_cont}&mac_nume=${mac_nume}&fac_mesp=${fac_mesp}&fac_anop=${fac_anop}&fac_nechI=${fac_nechI}&fac_nechF=${fac_nechF}&pvt_cont=${pvt_cont}`);
}

GetAmbientes(emp_codi:number,soc_cont:number,sbe_cont:number, mac_nume:string, fac_mesp:number,fac_anop:number){
  return this._comucations.Get(`consumos/GetAmbientes?soc_cont=${soc_cont}&sbe_cont=${sbe_cont}&mac_nume=${mac_nume}&fac_mesp=${fac_mesp}&fac_anop=${fac_anop}`,true,'Cargando ambientes...');

}
}
