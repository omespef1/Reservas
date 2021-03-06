import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {ComunicationsProvider} from '../comunications/comunications';
import {disponibilityRequest} from '../../class/models/models';

/*
  Generated class for the ThirdPartiesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ThirdPartiesProvider {

  constructor(private _communications:ComunicationsProvider) {
    
  }
  GetThirParties(booking:disponibilityRequest){
  if(booking.Op_Disp ==undefined){
  return  this._communications.Get(`gnterce/GetGnTerceNewVersion?Cla_cont=${booking.Cla_cont}&pro_cont=${booking.pro_cont}`);
  }
  else {
    let data = `gnterce/GetGnTerceNewVersion?Cla_cont=${booking.Cla_cont}&pro_cont=${booking.pro_cont}
      &Fini=${booking.startTime}&Ffin=${booking.endTime}&Op_Disp=${booking.Op_Disp}`;
      
    return this._communications.Get(data)
  }
  }

}
