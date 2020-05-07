
import { Injectable } from '@angular/core';
import { ComunicationsProvider } from '../comunications/comunications';
import { sopernw } from '../../class/models/models';

/*
  Generated class for the SopernwProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SopernwProvider {

  constructor(private _comu:ComunicationsProvider) {
    console.log('Hello SopernwProvider Provider');
  }


  GetSoPernw(emp_codi:number,sbe_cont:number,soc_cont:number,mac_nume:string){
    return this._comu.Get(`SoPernw?emp_codi=${emp_codi}&sbe_cont=${sbe_cont}&soc_cont=${soc_cont}&mac_nume=${mac_nume}`)
  }

SetSoPernw(profile:sopernw){
  return this._comu.Post(profile,`SoPernw`,'',false);
}

UpdateSoPernw(profile:sopernw){
  return this._comu.Post(profile,`SoPernw/update`,'',false);
}

DeleteSoPernw(emp_codi:number,per_cont:number){
  return this._comu.Post({emp_codi:emp_codi,per_cont:per_cont},`sopernw/delete`)
}
}
