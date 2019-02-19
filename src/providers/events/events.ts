import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
//Providers
import {ComunicationsProvider} from '../../providers/comunications/comunications';
import * as moment from 'moment';

/*
  Generated class for the EventsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class EventsProvider {

  constructor(private _comu:ComunicationsProvider) {
    
  }
  GetEvents(soc_cont:number,sbe_codi:string,mac_nume:string){ 
    return this._comu.Get(`EcCotiz?soc_cont=${soc_cont}&mac_nume=${mac_nume}&sbe_codi=${sbe_codi}`);
  }

}
