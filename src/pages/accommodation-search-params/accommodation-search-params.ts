import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NgForm } from '@angular/forms';
//pages
import {AccommodationRoomsPage} from '../accommodation-rooms/accommodation-rooms';
import { booking } from '../../class/models/models';

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
  constructor(public navCtrl: NavController, public navParams: NavParams) {


  }

  loadInitParams(){
    this.AccommodationBooking.Res_fini = new Date();
    this.AccommodationBooking.Res_fina = new Date();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AccommodationSearchParamsPage');
  }
  ChooseRoms(){
    this.navCtrl.push(AccommodationRoomsPage)
  }
  setMinDateOut(){
    if(this.AccommodationBooking.Res_fini > this.AccommodationBooking.Res_fina)
    this.AccommodationBooking.Res_fina = this.AccommodationBooking.Res_fini;
  }

}
