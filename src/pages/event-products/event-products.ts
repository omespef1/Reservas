import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,ViewController} from 'ionic-angular';

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
  constructor(public navCtrl: NavController, public navParams: NavParams,private _espac:AeEspacProvider, private _view:ViewController) {
    this.booking = navParams.get('booking');      
    this.products = this.booking.products || null;
  }

  ionViewDidLoad() {
    this.GetProducts();
  }

  GetProducts(){
if(this.products==null){
   this._espac.GetEspacProducts(this.booking).then((resp:transaction)=>{
      if(resp!= null && resp.ObjTransaction!=null){
        this.products = resp.ObjTransaction;
      }
   })
  }
}
  save(){
    this._view.dismiss(this.products.filter(v=>v.checked==true))

  }
  close(){
    this._view.dismiss()
  }
  valid(){
    if( this.products!==null && this.products.filter(p=>p.checked==true).length>0 )
    return true;
  }

}
