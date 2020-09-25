import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ComunicationsProvider } from "../comunications/comunications";
import { transaction } from '../../class/models/models';

/*
  Generated class for the EerevetProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class EerevetProvider {
  constructor(private _comu: ComunicationsProvider) {
    console.log("Hello EerevetProvider Provider");
  }

  GetEeRevet(emp_codi: number) {
    return this._comu.Get(`EeRevet?emp_codi=${emp_codi}`,false);
  }

  GetPhoto(emp_codi:number,rev_cont:number){
    return this._comu.Get(`EeRevet/GetPhoto?emp_codi=${emp_codi}&rev_cont=${rev_cont}`,false);
  }
}
