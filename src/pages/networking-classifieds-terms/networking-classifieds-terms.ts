import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NetworkingClassifiedsPage } from '../networking-classifieds/networking-classifieds';
import { NetworkingMenuPage } from '../networking-menu/networking-menu';
import { sessions } from '../../class/sessions/sessions';


/**
 * Generated class for the NetworkingClassifiedsTermsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-networking-classifieds-terms',
  templateUrl: 'networking-classifieds-terms.html',
})
export class NetworkingClassifiedsTermsPage {

  terms:string;
  constructor(public navCtrl: NavController,private _sessions:sessions) {
    this.terms = this._sessions.aeparam.par_conc;
  
  }

  ionViewDidLoad() {

    //console.log('ionViewDidLoad NetworkingClassifiedsTermsPage');
  }
  goHome(){
    this.navCtrl.setRoot(NetworkingMenuPage);
  }
  Acept(){
    this.navCtrl.setRoot(NetworkingClassifiedsPage);
  }
}
