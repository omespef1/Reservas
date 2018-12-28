import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
//providders
import {ComunicationsProvider} from '../../providers/comunications/comunications';

/*
  Generated class for the MainTemplatesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MainTemplatesProvider {

  constructor(private _comu:ComunicationsProvider) {
    console.log('Hello MainTemplatesProvider Provider');
  }
  GetEcMconmp(){
    return this._comu.Get('EcMcomp');
  }

}
