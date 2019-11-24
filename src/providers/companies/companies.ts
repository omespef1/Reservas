import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {ComunicationsProvider} from '../../providers/comunications/comunications';

/*
  Generated class for the CompaniesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CompaniesProvider {

  constructor(private _comu:ComunicationsProvider) {
    
  }
  GetGnEmpre(){
      return this._comu.Get(`GnEmpre/GetEmpresas`,false,'Cargando configuración..',false);
  }
 async  GetGnDigfl(dig_codi:string){
  return  this._comu.Get(`GnDigfl?dig_codi=${dig_codi}`,false);
  }
}
