import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NetworkingMenuPage } from '../networking-menu/networking-menu';

/**
 * Generated class for the NetworkingNewsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-networking-news',
  templateUrl: 'networking-news.html',
})
export class NetworkingNewsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NetworkingNewsPage');
  }
  goHome(){
    this.navCtrl.setRoot(NetworkingMenuPage)
  }
}
