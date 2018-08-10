import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
//providers
import {ComunicationsProvider} from '../comunications/comunications';
/*
  Generated class for the ConnectionsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export const appCentralizacionUrl = "http://localhost/SevenCentralizacion/api/GnConex/GetConnections?app_cont=1001"
export class ConnectionsProvider {
public   ClientUrl:string;
  constructor(private _communications:ComunicationsProvider) {
    console.log('Hello ConnectionsProvider Provider');
  }
  GetConnections(){
  return  this._communications.GetCentralizacion();
  }
  GetClientUrl(){
    return this.ClientUrl;
  }
  SetClientUrl(value:string){
    this.ClientUrl = value;
  }

}
