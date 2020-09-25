import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import {  AeDetin } from '../../class/models/models';

/**
 * Generated class for the EventInvitedBookingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-event-invited-booking',
  templateUrl: 'event-invited-booking.html',
})
export class EventInvitedBookingPage {
  invited:AeDetin= new AeDetin();
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private view:ViewController) {
  }

  ionViewDidLoad() {
    this.invited = new AeDetin();
  }
  closeModal(){
   this.view.dismiss();
  }

  addInvited(){
    this.view.dismiss(this.invited);
  }
}
