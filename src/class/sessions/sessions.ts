import {Injectable} from '@angular/core';
import { Storage } from '@ionic/storage';
import {NavController} from 'ionic-angular'
//pages
import {TabsPage} from '../../pages/tabs/tabs';
//config
import{SERVICES_URL} from '../../assets/config/config';

@Injectable()

export class sessions {

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
getSavedConnections():Promise<string>{
  return this.nativeStorage.get('SavedConnection');
}
setSavedConnections(conex:string){
    conex = SERVICES_URL;
    this.storage.set('SavedConnection',conex);
}
}
