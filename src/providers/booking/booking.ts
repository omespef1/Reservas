import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ComunicationsProvider} from '../../providers/comunications/comunications';
/*
  Generated class for the BookingProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class BookingProvider {

  constructor(private _comunications:ComunicationsProvider) {
    console.log('Hello BookingProvider Provider');
  }
  GetBooking(partner:any){
    return  this._comunications.Get(`reserva?soc_cont=${partner.Soc_cont}&sbe_cont=${partner.Sbe_cont}`);
  }
  cancelBooking(booking:any){

  }

}
