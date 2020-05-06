import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ComunicationsProvider } from '../comunications/comunications';
import { soclanw } from '../../class/models/soclanw/soclanw';

/*
  Generated class for the SoclanwProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SoclanwProvider {

  constructor(private _comu:ComunicationsProvider) {
    console.log('Hello SoclanwProvider Provider');
  }

  SetSoClanw(classified:soclanw){
  return this._comu.Post(classified,`soclanw`,'',false);

  }

}
