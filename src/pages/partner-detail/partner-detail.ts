import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';
import { sessions } from '../../class/sessions/sessions';

/**
 * Generated class for the PartnerDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-partner-detail',
  templateUrl: 'partner-detail.html',
})
export class PartnerDetailPage {
user:any={};
  constructor(private viewCtrl:ViewController, nav:NavParams,private _session:sessions) {
    this.user = nav.get('user');
    
  }

  ionViewDidLoad() {
    
  }

  closePartner(){
    this.viewCtrl.dismiss();
  }

}
