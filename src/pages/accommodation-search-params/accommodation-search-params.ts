import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NgForm } from '@angular/forms';
//pages
import {AccommodationRoomsPage} from '../accommodation-rooms/accommodation-rooms';
import { booking, user } from '../../class/models/models';
import { sessions } from '../../class/sessions/sessions';

/**
 * Generated class for the AccommodationSearchParamsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-accommodation-search-params',
  templateUrl: 'accommodation-search-params.html',
})
export class AccommodationSearchParamsPage {
  doneText:string = "Hecho";
  cancelText:string="Cancelar";
  AccommodationBooking: booking= new booking();
  user:user;
  constructor(public navCtrl: NavController, public navParams: NavParams,private _sesion:sessions) {


  }

  async loadInitParams(){
    this.AccommodationBooking.Res_fini = new Date();
    this.AccommodationBooking.Res_fina = new Date();
    this.user = await<any> this._sesion.GetLoggedin();
    this.AccommodationBooking.Mac_nume= this.user.Mac_nume1;
    this.AccommodationBooking.Sbe_cont = this.user.Sbe_cont;
    this.AccommodationBooking.Sbe_codi = this.user.Sbe_codi;  
    this.AccommodationBooking.Soc_cont = this.user.Soc_cont; 
  }

  ionViewDidLoad() {
    this.loadInitParams();
  }
  ChooseRoms(){
    console.log(this.AccommodationBooking);
    this.navCtrl.push(AccommodationRoomsPage,{'accommodation':this.AccommodationBooking})
  }
  setMinDateOut(){
    if(this.AccommodationBooking.Res_fini > this.AccommodationBooking.Res_fina)
    this.AccommodationBooking.Res_fina = this.AccommodationBooking.Res_fini;
  }

}