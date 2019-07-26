import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
//providers
import { ComunicationsProvider } from '../../providers/comunications/comunications';


/*
  Generated class for the PqrProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PqrProvider {

  constructor(public http: HttpClient, private _comunications: ComunicationsProvider) {
    
  }
  GetPqr(user: any) {
    return this._comunications.Get(`pqinpqr?soc_cont=${user.Soc_cont}&sbe_cont=${user.Sbe_cont}`)
  }
  setPqr(pqr:any){
    return this._comunications.Post(pqr,'pqinpqr/Aceptar');
  }
  GetGnItems(tit_cont:number){
   return  this._comunications.Get('GnItems?tit_cont=' + tit_cont,false);
  }
  GetGnArbol(tar_codi:number){
     return  this._comunications.Get('GnArbol?tar_codi=' + tar_codi,false)
  }

}
