import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
//pages
import {BookingPage } from '../booking/booking';
//models
import {bookingInfo,transaction} from '../../class/Models/models';
//providers
import {PaymentProvider} from '../../providers/payment/payment';

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
  booking : bookingInfo;
  transact:any ={};
  constructor(public navCtrl: NavController, public navParams: NavParams,private _payment:PaymentProvider) {
  }

  ionViewWillEnter(){
    console.log(this.navParams.get('booking'));
    this.booking = this.navParams.get('booking');
    this.GetDetailTransaction();
  }
  ionViewDidLoad() {
    
  }
  async GetDetailTransaction(){
    let TransactionResponse = <transaction> await this._payment.GetTransactionInformation(this.booking.payment.pap_tkid); 
    this.transact = TransactionResponse.ObjTransaction;
    console.log(TransactionResponse);
 
  }
  goReservas(){
    this.navCtrl.setRoot(BookingPage);
  }

}
