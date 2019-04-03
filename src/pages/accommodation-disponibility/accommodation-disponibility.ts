import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
//providers
import {AccommodationDisponibilityProvider} from '../../providers/accommodation-disponibility/accommodation-disponibility';
  import { from } from 'rxjs/observable/from';
import { transaction, booking, space } from '../../class/models/models';
//pages
import {AccomodationConfirmationPage} from '../accomodation-confirmation/accomodation-confirmation';
import { sessions } from '../../class/sessions/sessions';


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
  constructor(public navCtrl: NavController, public navParams: NavParams,private _accomodation:AccommodationDisponibilityProvider,private _sesion:sessions) {
    this.AccomodationBooking = navParams.get("accommodation");
    this.AccomodationBooking.Emp_codi = this._sesion.GetClientEmpCodi();
  }

  ionViewDidLoad() {
    this.GetDisponibility();
  }

  // Carga de alojamiento disponible

  GetDisponibility(){
    this._accomodation.GetDisponibility(this.AccomodationBooking).then((resp:transaction)=>{
      if(resp!=null){
        this.AccomodationBooking.AccomodationSpaces = resp.ObjTransaction;
      }
      else {
        this.AccomodationBooking.AccomodationSpaces=[];
      }
    })
  }

  goConfirmation(){
    this.navCtrl.push(AccomodationConfirmationPage, {'accomodation':this.AccomodationBooking});
  }
  showDescription(space:space){

  }

}
