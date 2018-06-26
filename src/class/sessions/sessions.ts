import {Injectable} from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage';
import {NavController} from 'ionic-angular'
//pages
import {TabsPage} from '../../pages/tabs/tabs';

@Injectable()

export class sessions {

constructor(private nativeStorage: NativeStorage){
console.log('read from storage')
}
//Setea la sesión cuando se loguea un usuario
setLoggedIn(user:any){
  this.nativeStorage.setItem('loggedUser',user);
}
GetLoggedin(){

  return this.nativeStorage.getItem('loggedUser');
}
}
