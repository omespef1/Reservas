import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Observable } from 'rxjs/Observable';
/**
 * Generated class for the NetworkingChatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-networking-chat',
  templateUrl: 'networking-chat.html',
})
export class NetworkingChatPage {
  items: Observable<any[]>;
  constructor(
  
    public navCtrl: NavController,
  ) {

  
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad NetworkingChatPage');
  }
}
