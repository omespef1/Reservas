import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import {  ComunicationsProvider} from '../comunications/comunications';
//clases
import {TOSoRsoci } from '../../class/models/models';
import {sessions} from '../../class/sessions/sessions';


/*
  Generated class for the PartnerProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PartnerProvider {
  constructor(public http: Http,private _comunications:ComunicationsProvider,private _sesion:sessions) {
    
  }
  GetPartner(user:string,password:string){
    //Se realiza por post ya que el api creado solicita los datos de acceso mediente post
    //Se crea el objeto user y sus propiedades para enviarlo
    let UserObj :any= {  Sbe_ncar:'',Soc_pass:'' ,Emp_codi:this._sesion.GetClientEmpCodi() }
    UserObj.Sbe_ncar = user;
    UserObj.Soc_pass = password;
    return this._comunications.Post(UserObj,'SoSocio','Verificando datos...');
  }

  GetPartnerRegister(partner:any):Promise<any>{
  return  this._comunications.Get(`SoRsoci?soc_cont=${partner.soc_cont}&sbe_cont=${partner.sbe_cont}&soc_cing=${partner.soc_cing}`,true,'Verificando Código...')
  }
  SetPartner(register:TOSoRsoci){
    return  this._comunications.Post(register,'SoRsoci')
  }

  GetSoSocioPhoto(emp_codi:number,soc_cont:number,sbe_cont:number,mac_nume:string){
    return this._comunications.Get(`SoSocio/GetSoSocioPhoto?emp_codi=${emp_codi}&soc_cont=${soc_cont}&sbe_cont=${sbe_cont}&mac_nume=${mac_nume}`,false,'',false)
  }


}
