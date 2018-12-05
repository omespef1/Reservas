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

export class ConnectionsProvider {
  constructor(private _communications:ComunicationsProvider) {
    console.log('Hello ConnectionsProvider Provider');
  }
  GetConnections(){
  return  this._communications.GetCentralizacion('GnConex/GetConnections?app_cont=1001');
  }
  GetVersioning():Promise<{}>{
  return  this._communications.GetCentralizacion('GnAppDw/1001','Verificando versión...',false)
  }
  GetAllAps():Promise<{}>{
  return  this._communications.GetCentralizacion('GnAppDw')
  }


}
