import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ComunicationsProvider } from "../comunications/comunications";

/*
  Generated class for the GntipdoProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GntipdoProvider {
  constructor(private _comucations: ComunicationsProvider) {}
  GetGnTipdo(emp_codi:number) {
    return this._comucations.Get(`GnTipdo?emp_codi=${emp_codi}`, false, "",false);
  }
}
