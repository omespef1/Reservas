import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SopernwProvider } from '../../providers/sopernw/sopernw';
import { sessions } from '../../class/sessions/sessions';
import { sopernw, user, transaction } from '../../class/models/models';
import { NetworkingMenuPage } from '../networking-menu/networking-menu';

/**
 * Generated class for the NetworkingProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-networking-profile',
  templateUrl: 'networking-profile.html',
})
export class NetworkingProfilePage {
  myProfile: sopernw = new sopernw();
  loadingProfile = true;
  user: user;
  constructor(public navCtrl: NavController, public navParams: NavParams,private _sopernw: SopernwProvider, private _sessions: sessions) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NetworkingProfilePage');
  }

  GetSoPernw() {
    this._sopernw
      .GetSoPernw(
        this.user.Emp_codi,
        this.user.Sbe_cont,
        this.user.Soc_cont,
        this.user.Mac_nume
      )
      .then((resp: transaction) => {

        this.loadingProfile = false;
      });
  }

  goHome(){
    this.navCtrl.setRoot(NetworkingMenuPage);
  }

}
