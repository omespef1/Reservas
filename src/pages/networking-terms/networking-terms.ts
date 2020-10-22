import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { ae_param, user, transaction } from '../../class/models/models';
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
accepting=false;
  constructor(private _sesions:sessions,private _aeinapp:AeinappProvider,
    private nav:NavController,private _view:ViewController) {
this.params = this._sesions.getAeParam();
this._sesions.GetLoggedin().then((resp:user)=>{
  this.user = resp;
})
  }

  ionViewDidLoad() {
    console.log(this.params);
    console.log('ionViewDidLoad TermsPage');
  }

  Ok(){
    debugger;
    console.log('acepto');
    this.accepting=true;
    this._aeinapp.SetAeInApp('T').then((resp:transaction)=>{
      if(resp!=null && resp.Retorno==0){
        this.accepting=false;
        this._sesions.setAcceptedTerms();
        this._view.dismiss();
      }
    })
  }





}
