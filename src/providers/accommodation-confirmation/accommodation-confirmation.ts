import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { booking } from '../../class/models/models';
import { ComunicationsProvider } from '../comunications/comunications';


/*
  Generated class for the AccommodationConfirmationProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AccommodationConfirmationProvider {

  constructor(public http: HttpClient,private _comu:ComunicationsProvider) {
    console.log('Hello AccommodationConfirmationProvider Provider');
  }


  GetValuesSpaces(booking:booking){
   return this._comu.Post(booking,'Pagos/GetValoresRseserva');
  }
}
