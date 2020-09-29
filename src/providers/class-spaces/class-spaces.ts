import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {ComunicationsProvider} from '../comunications/comunications'
/*
  Generated class for the ClassSpacesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ClassSpacesProvider {

  constructor(public http: HttpClient,private _comunications:ComunicationsProvider) {
    
  }
GetClassSpaces(){
 return  this._comunications.Get('aeclase?');
}
GetClassSpace(booking:any){
   return  this._comunications.Get(`aeclase/GetAeClase?cla_cont=${booking.Cla_cont}`);
}
GetAePhoto(emp_codi:number,cla_cont){
  return  this._comunications.Get(`aeclase/GetAeClasePhoto?emp_codi=${emp_codi}&cla_cont=${cla_cont}`,false,'');
}
}
