import {Injectable} from '@angular/core';
import { Storage } from '@ionic/storage';
import {NavController} from 'ionic-angular'
//pages
import {TabsPage} from '../../pages/tabs/tabs';

@Injectable()

export class sessions {

constructor(private nativeStorage: Storage){
console.log('read from storage')
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
getReasonsPqr(){
    return this.nativeStorage.get('reasonsPqr');
}
setAmbientPqr(reasons:any){
    this.nativeStorage.set('ambientPqr',reasons);
}
getAmbientPqr(){
    return this.nativeStorage.get('ambientPqr');
}
}
