import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
//provider
import {ComunicationsProvider} from '../comunications/comunications';

/*
  Generated class for the PaymentProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PaymentProvider {

  constructor(private _comu:ComunicationsProvider) {
    console.log('Hello PaymentProvider Provider');
  }
  CreateTransactionPayment(payment:any){
     return this._comu.Post(payment,'Pagos');
  }
  GetTransactionInformation(ticketId:number){
    return this._comu.Get(`Pagos/${ticketId}`,true,'Consultando el estado de la transacción...',false);
  }

}
