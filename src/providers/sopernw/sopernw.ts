
import { Injectable } from '@angular/core';
import { ComunicationsProvider } from '../comunications/comunications';

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


  GetSoPernw(){
    return this._comu.Get()
  }
  GetDisponibility(booking:booking){
    
    return  this._comu.Post(booking,'sopernw/GetDisponibilityAccommodation');
   }

}
