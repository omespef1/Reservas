import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NetworkingMenuPage } from '../networking-menu/networking-menu';
import { NetworkingProfilePage } from '../networking-profile/networking-profile';

/**
 * Generated class for the NetworkingSearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-networking-search',
  templateUrl: 'networking-search.html',
})
export class NetworkingSearchPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NetworkingSearchPage');
  }

  getItems(){
    
  }

  goHome(){
    this.navCtrl.setRoot(NetworkingMenuPage);
  }
  goOtherProfile(){
    this.navCtrl.push(NetworkingProfilePage,{'myProfile':false})
  }

}
