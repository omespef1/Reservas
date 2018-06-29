import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';

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
  constructor(private viewCtrl:ViewController, nav:NavParams) {
    this.user = nav.get('user');
    console.log(this.user);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PartnerDetailPage');
  }

  closePartner(){
    this.viewCtrl.dismiss();
  }

}
