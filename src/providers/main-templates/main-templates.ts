import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
//providders
import {ComunicationsProvider} from '../../providers/comunications/comunications';
//clases
import {sessions} from '../../class/sessions/sessions';
 
/*
  Generated class for the MainTemplatesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MainTemplatesProvider {

  constructor(private _comu:ComunicationsProvider,private _sesion:sessions) {
    console.log('Hello MainTemplatesProvider Provider');
  }
  GetEcMconmp(){
    return this._comu.Get(`EcMcomp?emp_codi= ${this._sesion.GetClientEmpCodi()}`,true,'Cargando menús',false);
  }

}
