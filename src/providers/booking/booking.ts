import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
//providers
import { ComunicationsProvider } from '../../providers/comunications/comunications';
import { ClassSpacesProvider } from '../class-spaces/class-spaces';


/*
  Generated class for the BookingProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class BookingProvider {

  constructor(private _comunications: ComunicationsProvider, private _classSpaces: ClassSpacesProvider) {
    console.log('Hello BookingProvider Provider');
  }
  GetBooking(partner: any) {
    return this._comunications.Get(`reserva?soc_cont=${partner.Soc_cont}&sbe_cont=${partner.Sbe_cont}`);
  }
  GetGnItems() {
    return this._comunications.Get(`GnItems?tit_cont=349`);
  }
  cancelBooking(booking: any) {
    return this._comunications.Post(booking, `reserva/cancelar`);
  }
  GetDisponibility(){
    return this._comunications.PostTest('http://186.154.240.180:8098/api/Agenda?Cla_cont=4&pro_cont=15028&year=2018&month=7&day=17&esp_mdit=N&ter_codi=0&Op_Disp=undefined')
  }

}
