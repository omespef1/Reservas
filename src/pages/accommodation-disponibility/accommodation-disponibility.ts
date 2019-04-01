import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
//providers
import {AccommodationDisponibilityProvider} from '../../providers/accommodation-disponibility/accommodation-disponibility';
  import { from } from 'rxjs/observable/from';
import { transaction, booking } from '../../class/models/models';


/**
 * Generated class for the AccommodationDisponibilityPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-accommodation-disponibility',
  templateUrl: 'accommodation-disponibility.html',
})
export class AccommodationDisponibilityPage {
AccomodationBooking:booking;
  constructor(public navCtrl: NavController, public navParams: NavParams,private _accomodation:AccommodationDisponibilityProvider) {
    this.AccomodationBooking = navParams.get("accommodation");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AccommodationDisponibilityPage');
  }

  GetDisponibility(){
    this._accomodation.GetDisponibility(this.AccomodationBooking).then((resp:transaction)=>{
      if(resp!=null){
        this.AccomodationBooking.spaces = resp.ObjTransaction;
      }
    })
  }

}
