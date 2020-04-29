import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ae_param, user } from '../../class/models/models';
import { sessions } from '../../class/sessions/sessions';
import { AeinappProvider } from '../../providers/aeinapp/aeinapp';
import { NetworkingMenuPage } from '../networking-menu/networking-menu';

/**
 * Generated class for the NetworkingTermsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-networking-terms',
  templateUrl: 'networking-terms.html',
})
export class NetworkingTermsPage {

params:ae_param;
user:user;
hasAccepted=false;
  constructor(private _sesions:sessions,private _aeinapp:AeinappProvider,private nav:NavController) {
this.params = this._sesions.getAeParam();
this._sesions.GetLoggedin().then((resp:user)=>{
  this.user = resp;
})
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TermsPage');
  }

  Ok(){
    this._aeinapp.SetAeInApp('T','S');
  }
  reject(){
    this._aeinapp.SetAeInApp('T','S');
  }

  goMenu(){
    this.nav.setRoot(NetworkingMenuPage);
  }



}
