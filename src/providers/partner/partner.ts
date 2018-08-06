import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import {  ComunicationsProvider} from '../comunications/comunications';
//clases
import {TOSoRsoci } from '../../class/Models/models';


/*
  Generated class for the PartnerProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PartnerProvider {
  UrlService:string;
  constructor(public http: Http,private _comunications:ComunicationsProvider) {
    console.log('Hello PartnerProvider Provider');
  }
  GetPartner(user:string,password:string){
    //Se realiza por post ya que el api creado solicita los datos de acceso mediente post
    //Se crea el objeto user y sus propiedades para enviarlo
    let UserObj :any= {  Sbe_ncar:'',Soc_pass:''  }
    this.UrlService = 'SoSocio/';
    UserObj.Sbe_ncar = user;
    UserObj.Soc_pass = password;
    return this._comunications.Post(UserObj,'SoSocio');
  }

  GetPartnerRegister(partner:any):Promise<any>{
  return  this._comunications.Get(`SoRsoci?soc_cont=${partner.soc_cont}&sbe_cont=${partner.sbe_cont}&soc_cing=${partner.soc_cing}`,true,'Verificando Código...')
  }
  SetPartner(register:TOSoRsoci){
    return  this._comunications.Post(register,'SoRsoci')
  }
  UpdatePartner(){

  }
}
