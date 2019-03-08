import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

//providers 
import {AeEspacProvider} from '../../providers/ae-espac/ae-espac';
//models
import {product,bookingInfo, transaction} from '../../class/Models/models';

/**
 * Generated class for the EventProductsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-event-products',
  templateUrl: 'event-products.html',
})
export class EventProductsPage {
products:product[];
booking:bookingInfo;
  constructor(public navCtrl: NavController, public navParams: NavParams,private _espac:AeEspacProvider) {
    this.booking = navParams.get('booking');
  }

  ionViewDidLoad() {
    this.GetProducts();
  }

  GetProducts(){
   this._espac.GetEspacProducts(this.booking).then((resp:transaction)=>{
      if(resp!= null && resp.ObjTransaction!=null){
        this.products = resp.ObjTransaction;
      }
   })
  }
  save(){
    this.navCtrl.getPrevious().data.products = this.products.filter(v=>v.checked==true);
   this.navCtrl.pop();
  }

}
