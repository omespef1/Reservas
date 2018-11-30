import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import {bookingInfo} from '../../class/Models/models';
import {sessions} from '../../class/sessions/sessions';
import { BookingProvider } from '../../providers/booking/booking';


/**
 * Generated class for the CarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-car',
  templateUrl: 'car.html',
})
export class CarPage {
  bookingCar:bookingInfo[];
  total:number;
  constructor(public navCtrl: NavController, public navParams: NavParams, private _sesion:sessions) {
  }

  ionViewDidLoad() {
    this.getBookingsCar();
  }


  async getBookingsCar(){
    this.bookingCar = <bookingInfo[]> await this._sesion.getShoppingList();
    console.log(this.bookingCar);  
   this.total = this.bookingCar.reduce((acc, pilot) => acc + pilot.res_valo, 0);        
  }
}
