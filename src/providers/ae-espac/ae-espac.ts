import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {ComunicationsProvider} from '../comunications/comunications';
import { bookingInfo } from '../../class/models/models';
import { sessions } from '../../class/sessions/sessions';

/*
  Generated class for the AeEspacProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AeEspacProvider {

  constructor(private _comu:ComunicationsProvider,private _sesion:sessions) {
    console.log('Hello AeEspacProvider Provider');
  }

  GetEspacProducts(booking:bookingInfo){
    return  this._comu.Get(`AeEspac/GetAeProducts?esp_cont=${booking.esp_cont}`);
 }

 GetAeParam(){
  return  this._comu.Get(`AeClase/GetAeParam?emp_codi=${this._sesion.GetClientEmpCodi()}`,false,'',false);
}
 

  

}
