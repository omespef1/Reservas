import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,ViewController} from 'ionic-angular';
//providers
import {BookingProvider} from  '../../providers/booking/booking';
//models
import {gntoper,transaction} from '../../class/Models/models';

/**
 * Generated class for the EventGntoperPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-event-gntoper',
  templateUrl: 'event-gntoper.html',
})
export class EventGntoperPage {
  gntoper:gntoper[];
  constructor(public navCtrl: NavController, public navParams: NavParams,private _booking:BookingProvider,private _view:ViewController) {
  }

  ionViewDidLoad() {
   this.GetGnToper();
  }

  async GetGnToper(){
     let result  = <transaction> await  this._booking.GetGnToper();
     if(result!=null){
       this.gntoper = result.ObjTransaction;
     }
  }

  selectGnToper(gntoper:gntoper){
      this._view.dismiss(gntoper);
  }

}
