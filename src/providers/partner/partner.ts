import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import {ComunicationsProvider} from '../comunications/comunications';


/*
  Generated class for the PartnerProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PartnerProvider {
  UrlService:string;
  constructor(public http: Http,private _comucations:ComunicationsProvider) {
    console.log('Hello PartnerProvider Provider');
  }
  GetPartner(user:string,password:string){
    //Se realiza por post ya que el api creado solicita los datos de acceso mediente post
    //Se crea el objeto user y sus propiedades para enviarlo
    let UserObj :any= {  Sbe_ncar:'',Soc_pass:''  }
    this.UrlService = 'SoSocio/';
    UserObj.Sbe_ncar = user;
    UserObj.Soc_pass = password;
    return this._comucations.Post(UserObj,'SoSocio');
  }

  UpdatePartner(){

  }
}
