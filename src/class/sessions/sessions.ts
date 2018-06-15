import {Injectable} from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage';
import {NavController} from 'ionic-angular'
//pages
import {TabsPage} from '../../pages/tabs/tabs';

@Injectable()

export class sessions {

constructor(private nativeStorage: NativeStorage){

}
//Setea la sesión cuando se loguea un usuario
loggedIn(user:any){
  this.nativeStorage.setItem('loggedUser',user);
  
}
}
