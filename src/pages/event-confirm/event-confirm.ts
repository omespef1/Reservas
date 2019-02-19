import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
//models
import {booking,disponibilityRequestEvent} from '../../class/Models/models';

/**
 * Generated class for the EventConfirmPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-event-confirm',
  templateUrl: 'event-confirm.html',
})
export class EventConfirmPage {

   MyEventBooking :  booking = new booking();
   mySelectedEvent: disponibilityRequestEvent;
   
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.mySelectedEvent = navParams.get("mySelectedEvent");
  }

  ionViewDidLoad() {
    
  }

}
