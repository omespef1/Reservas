import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NetworkingMenuPage } from '../networking-menu/networking-menu';

/**
 * Generated class for the NetworkingMessagesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-networking-messages',
  templateUrl: 'networking-messages.html',
})
export class NetworkingMessagesPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NetworkingMessagesPage');
  }

  goHome(){
    this.navCtrl.setRoot(NetworkingMenuPage);
  }


}
