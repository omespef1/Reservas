import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ComunicationsProvider } from '../comunications/comunications';
import { transaction } from '../../class/models/models';
import { sessions } from '../../class/sessions/sessions';

/*
  Generated class for the ConfigProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ConfigProvider {

  constructor(private _http: ComunicationsProvider,private _sesion:sessions) { 
  }

  GetConfig(key:string){
    this._http.Get(`Config/GetConfig?keyName=${key}`,false,'',false).then((resp:transaction)=>{
      if(resp!=null && resp.Retorno==0){
        this._sesion.setUrlDonations(resp.ObjTransaction);
      }
    })
  }

}
