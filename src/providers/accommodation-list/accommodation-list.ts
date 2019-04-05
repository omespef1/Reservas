import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ComunicationsProvider } from '../comunications/comunications';
import { sessions } from '../../class/sessions/sessions';

/*
  Generated class for the AccommodationListProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AccommodationListProvider {

  constructor(private _comu:ComunicationsProvider,private sesion:sessions) {
    console.log('Hello AccommodationListProvider Provider');
  }


  GetBooking(partner: any) {
    console.log(partner);
     return this._comu.Get(`reservaAlojamiento?soc_cont=${partner.Soc_cont}&sbe_cont=${partner.Sbe_cont}&sbe_codi=${partner.Sbe_codi}&cla_cont=${this.sesion.getAeParam().cla_cont}`,true,'Cargando información de reservas realizadas...');
   }
}
