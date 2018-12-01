import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
//pages
import {BookingPage } from '../booking/booking';

/**
 * Generated class for the ConfirmPaymentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-confirm-payment',
  templateUrl: 'confirm-payment.html',
})
export class ConfirmPaymentPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConfirmPaymentPage');
  }
  goReservas(){
    this.navCtrl.setRoot(BookingPage);
  }

}
