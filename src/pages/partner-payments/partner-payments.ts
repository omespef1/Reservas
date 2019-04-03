import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PartnerPaymentsDetailsPage } from '../partner-payments-details/partner-payments-details';
import { PartnerPaymentsProvider } from '../../providers/partner-payments/partner-payments';
import { transaction, gn_papse } from '../../class/models/models';



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
  constructor(public navCtrl: NavController, public navParams: NavParams, private _payment:PartnerPaymentsProvider) {
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

}
