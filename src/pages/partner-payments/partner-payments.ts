import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { PartnerPaymentsDetailsPage } from '../partner-payments-details/partner-payments-details';
import { PartnerPaymentsProvider } from '../../providers/partner-payments/partner-payments';
import { transaction, gn_papse } from '../../class/models/models';
import { ConfirmPaymentPage } from '../confirm-payment/confirm-payment';



/**
 * Generated class for the PartnerPaymentsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-partner-payments',
  templateUrl: 'partner-payments.html',
})
export class PartnerPaymentsPage {
  payments: gn_papse[]=[];
  constructor(public navCtrl: NavController, public navParams: NavParams, private _payment:PartnerPaymentsProvider,private _modal:ModalController) {
  }

  ionViewDidLoad() {
   this.getPayments();
  }
  seeDetails(payment:gn_papse){
   this.navCtrl.push(PartnerPaymentsDetailsPage,{'payment':payment});
  }

  getPayments(){
    this._payment.GetPayments().then((resp:transaction)=>{
     if(resp!=null){
       this.payments = resp.ObjTransaction;
     }
    })
  }

  seeDetailsPayment(payment:gn_papse){
    let paymentConfirm = { 'ticket': payment.pap_tkid, 'online': true }
    let modal = this._modal.create(ConfirmPaymentPage, { 'payment': paymentConfirm });   
    modal.present();
  }

}
