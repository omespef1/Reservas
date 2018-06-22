import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {ComunicationsProvider} from '../comunications/comunications';

//models
import {TOSoRsoci } from '../../class/Models/models';
/*
  Generated class for the RegisterProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RegisterProvider {

  constructor(public http: HttpClient, private _communications:ComunicationsProvider) {
    console.log('Hello RegisterProvider Provider');
  }

  SetRegister(register:TOSoRsoci){
    return  this._communications.Post(register,'SoRsoci')
  }

}
