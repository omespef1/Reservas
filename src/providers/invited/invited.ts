import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ComunicationsProvider } from "../comunications/comunications";
import { invited } from '../../class/Models/models';

/*
  Generated class for the InvitedProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class InvitedProvider {

  constructor(public http: HttpClient, private _comucations:ComunicationsProvider) {
    
  }
GetInviteds(emp_codi:number, sbe_codi:string){
return  this._comucations.Get(`Invitados/GetInvitados?emp_codi=${emp_codi}&sbe_codi=${sbe_codi}`,true,'Cargando invitados...');
}

SetInvited(invited:invited){
  return this._comucations.Post(invited,'Invitados/SetInvited','Invitando...');
}

}
