import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ChatProvider } from '../../providers/chat/chat';

/**
 * Generated class for the NetworkingChatLoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-networking-chat-login',
  templateUrl: 'networking-chat-login.html',
})
export class NetworkingChatLoginPage {

  constructor(public _cs: ChatProvider ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NetworkingChatLoginPage');
  }


  ingresar( proveedor: string ){
    console.log( proveedor );

    

  }

}
