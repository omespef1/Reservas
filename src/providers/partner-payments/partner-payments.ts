import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ComunicationsProvider } from '../comunications/comunications';
import { sessions } from '../../class/sessions/sessions';
import { user } from '../../class/models/models';

/*
  Generated class for the PartnerPaymentsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PartnerPaymentsProvider {

  constructor(private _comu:ComunicationsProvider, private _sesion:sessions) {
    console.log('Hello PartnerPaymentsProvider Provider');
  }

  GetPayments(){
 return this._sesion.GetLoggedin().then((user:user)=>{
   return this._comu.Get(`Pagos/GetPagoSocio?sbe_codi=${user.Sbe_codi}`);
  })
  
  }

}
