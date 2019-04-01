import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
//providers

import {ComunicationsProvider} from '../comunications/comunications';
import { booking } from '../../class/models/models';

/*
  Generated class for the AccommodationDisponibilityProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AccommodationDisponibilityProvider {

  constructor(public http: HttpClient,private _comu:ComunicationsProvider ) {
    console.log('Hello AccommodationDisponibilityProvider Provider');
  }

  GetDisponibility(booking:booking){
   return  this._comu.Post(booking,'agenda/GetDisponibilityAccommodation');
  }
}
