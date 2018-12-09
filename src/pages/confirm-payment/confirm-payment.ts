import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
//pages
import {BookingPage } from '../booking/booking';
//models
import {bookingInfo,transaction,user} from '../../class/Models/models';
//providers
import {PaymentProvider} from '../../providers/payment/payment';
//clases
import {general} from '../../class/general/general';
import {sessions} from '../../class/sessions/sessions';

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
  online:boolean=true;
  booking : bookingInfo;
  transact:any ={};
  offlineBookings:bookingInfo[];
  user:user;
  constructor(public navCtrl: NavController, public navParams: NavParams,private _payment:PaymentProvider,
    private _general:general,private _sesion:sessions) {
  }

  ionViewWillEnter(){
    console.log(this.navParams.get('payment'));
    this.online = this.navParams.get('payment').online;
    if(this.online)
    this.GetOnLinePayment();
    if(!this.online)
    this.getOfflinePayment();
  }

  GetOnLinePayment(){
    console.log(this.navParams.get('payment').booking);
    this.booking = this.navParams.get('payment').booking;           
    this.GetDetailTransaction();
  }
  async getOfflinePayment(){
    this.user  = <user>await this._sesion.GetLoggedin();
    this.offlineBookings = this.navParams.get('payment').bookings;
     
  }
  async GetDetailTransaction(){
    let tickedId= 0;
    if(this.booking == undefined){
     tickedId = this.navParams.get('payment').ticket;
    }
    if(this.booking != undefined){
      tickedId = this.booking.payment.pap_tkid;
     }
     

    let TransactionResponse = <transaction> await this._payment.GetTransactionInformation(tickedId); 
    this.transact = TransactionResponse.ObjTransaction;
    console.log(TransactionResponse);
 
  }
  goReservas(){
    this.navCtrl.push(BookingPage);
  }
  print(){
    this._general.showToastMessage('Comprobante generado','bottom');
    this.goReservas();
  }

}
