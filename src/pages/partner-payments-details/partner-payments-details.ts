import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { gn_papse } from '../../class/models/models';

/**
 * Generated class for the PartnerPaymentsDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-partner-payments-details',
  templateUrl: 'partner-payments-details.html',
})
export class PartnerPaymentsDetailsPage {
  payment:gn_papse;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.payment = navParams.get('payment');
    console.log(this.payment);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PartnerPaymentsDetailsPage');
  }

}
