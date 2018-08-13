import {Injectable} from '@angular/core';
import { Storage } from '@ionic/storage';
import {NavController} from 'ionic-angular'
//pages
import {TabsPage} from '../../pages/tabs/tabs';
//config
import {GnConex} from '../../class/models/models';

@Injectable()

export class sessions {
  public  clientUrl:string;
  public  emp_codi:number;
constructor(private nativeStorage: Storage){
}
//Setea la sesión cuando se loguea un usuario
setLoggedIn(user:any){
console.log(user);
  this.nativeStorage.set('loggedUser',user);
}
GetLoggedin(){
  return this.nativeStorage.get('loggedUser');
}
removeSession(){
  this.nativeStorage.remove('loggedUser');
  this.nativeStorage.remove('reasonsPqr');
  this.nativeStorage.remove('ambientPqr');
}
erraseAlldata(){
  this.nativeStorage.remove('secureUser');
  this.nativeStorage.remove('EmpCodi');
  this.nativeStorage.remove('partnerConnection');
  this.nativeStorage.remove('companies');
}
setReasonsPrq(reasons:any){
    this.nativeStorage.set('reasonsPqr',reasons);
}
setUserFingerPrint(user:string){
  this.nativeStorage.set('secureUser',user);
}
getUserFingerPrint(){
  return this.nativeStorage.get('secureUser');
}

getReasonsPqr(){
    return this.nativeStorage.get('reasonsPqr');
}
setAmbientPqr(reasons:any){
    this.nativeStorage.set('ambientPqr',reasons);
}
getAmbientPqr(){
    return this.nativeStorage.get('ambientPqr');
}
getPartnerConnections():Promise<GnConex>{
  return this.nativeStorage.get('partnerConnection');
}
setPartnerConnections(conex:GnConex){
    this.nativeStorage.set('partnerConnection',conex);
    this.SetClientUrl(conex.CNX_IPSR);
}

getEmpCodiSession():Promise<number>{
  return this.nativeStorage.get('EmpCodi');
}
setEmpCodiSession(EmpCodi:number){
    this.nativeStorage.set('EmpCodi',EmpCodi);
}


GetClientUrl(){
  return this.clientUrl;
}
SetClientUrl(value:string){
  this.clientUrl = value;
}
GetClientEmpCodi(){
  return this.emp_codi;
}
SetClientEmpCodi(value:number){
  this.emp_codi = value;
}
SetCompanies(companies){
  this.nativeStorage.set('companies',companies);
}
GetCompanies(){
  return this.nativeStorage.get('companies');
}
}
