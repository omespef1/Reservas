import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ComunicationsProvider } from '../comunications/comunications';
import { soclanw } from '../../class/models/soclanw/soclanw';

/*
  Generated class for the SoclanwProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SoclanwProvider {

  constructor(private _comu:ComunicationsProvider) {
    console.log('Hello SoclanwProvider Provider');
  }
GetSoClanw(emp_codi:number){
  return this._comu.Get(`soclanw?emp_codi=${emp_codi}`,false,'',false);
}
  SetSoClanw(classified:soclanw){
  return this._comu.Post(classified,`soclanw`,'',false);
  }
  UpdateSoClanw(classified:soclanw){
    return this._comu.Post(classified,`soclanw/update`);
  }

  GetPhoto(emp_codi:number,cla_cont:number){
    return this._comu.Get(`SoClanw/GetPhoto?emp_codi=${emp_codi}&cla_cont=${cla_cont}`,false,'',false);
  }

}
