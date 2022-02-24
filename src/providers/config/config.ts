import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ComunicationsProvider } from '../comunications/comunications';
import { transaction } from '../../class/models/models';
import { sessions } from '../../class/sessions/sessions';
import { general } from '../../class/general/general';

/*
  Generated class for the ConfigProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ConfigProvider {

  constructor(private _http: ComunicationsProvider,private _sesion:sessions,private alert:general) { 
  }

  GetConfig(key:string){
    this._http.Get(`Config/GetConfig?keyName=${key}`,false,'',false).then((resp:transaction)=>{
      if(resp!=null && resp.Retorno==0){
        this._sesion.setUrlDonations(resp.ObjTransaction);
      }
      else {
        this.alert.showToastMessage(`Error en la parametrización. No se encontró configuración para el item ${key}. Contacte a su administrador`,'bottom');
      }
    })
  }

}
