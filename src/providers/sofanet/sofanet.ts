import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ComunicationsProvider } from "../comunications/comunications";
import { sofanet } from '../../class/models/models';

/*
  Generated class for the SofanetProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SofanetProvider {

  constructor(private _comu:ComunicationsProvider) {
    console.log('Hello SoFanetProvider Provider');
  }
GetSoFanet(emp_codi:number,per_cont:number){
  return this._comu.Get(`SoFanet?emp_codi=${emp_codi}&per_cont=${per_cont}`,false,'',false);
}
  SetSoFanet(favorite:sofanet){

    console.log(favorite);
  return this._comu.Post(favorite,`SoFanet`,'',false);
  }
  deleteSoFanet(emp_codi:number,fan_cont:number){
    return this._comu.Get(`SoFanet/delete?emp_codi=${emp_codi}&fan_cont=${fan_cont}`,false,'',false)
  }










}
