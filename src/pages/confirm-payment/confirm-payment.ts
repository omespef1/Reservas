import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,ViewController} from 'ionic-angular';
//pages
import {BookingPage } from '../booking/booking';
//models
import {bookingInfo,transaction,user} from '../../class/models/models';
//providers
import {PaymentProvider} from '../../providers/payment/payment';
//clases
import {general} from '../../class/general/general';
import {sessions} from '../../class/sessions/sessions';
import { ThirdPartiesPage } from '../third-parties/third-parties';

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
    private _general:general,private _sesion:sessions,private _view:ViewController) {
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
    console.log(this.user);
    console.log(this.offlineBookings);
     
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
   this._view.dismiss();
  }
  async print(){
    const voucher : transaction = <transaction>await this._payment.CreateVoucher(this.offlineBookings)
    if(voucher!=null &&  voucher.Retorno==1)
        this._general.showToastMessage(voucher.TxtError,'bottom');
        if(voucher!=null &&  voucher.Retorno==0){
          this._general.showToastMessage('Se envió un email con los datos de la transacción!','bottom');
          this.offlineBookings.forEach(offline => {
            this._sesion.removeFromShoppingList(offline);
            this.navCtrl.insert(0,BookingPage);
            this.navCtrl.popToRoot();
          });
         
        }
       
    this.goReservas();
  }

}
