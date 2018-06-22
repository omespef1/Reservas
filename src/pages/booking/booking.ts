import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
//Providers
import {ClassSpacesProvider} from '../../providers/class-spaces/class-spaces';
import {ClassSpacesPage} from '../class-spaces/class-spaces';

/**
 * Generated class for the BookingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-booking',
  templateUrl: 'booking.html',
})
export class BookingPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BookingPage');
  }

  getTypeSpaces(){

  }
newBooking(){
  this.navCtrl.push(ClassSpacesPage);
}
}
