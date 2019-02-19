import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EventDisponibilityPage } from '../event-disponibility/event-disponibility';
import {disponibilityRequestEvent}  from '../../class/Models/models';
import * as moment from 'moment';
/**
 * Generated class for the NewEventPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-new-event',
  templateUrl: 'new-event.html',

})
export class NewEventPage {
  myEvent: disponibilityRequestEvent = new  disponibilityRequestEvent();
  minDate:any = moment(new Date()).format('DD-MM-YYYY HH:mm')
  doneText:string ="Hecho";
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewEventPage');
  }
  goDisponibility(){   
    let now = new Date();
    this.myEvent.dho_mesp = now.getMonth() +1;
    this.myEvent.dhop_anop = now.getFullYear();
    console.log(this.myEvent);
    this.navCtrl.push(EventDisponibilityPage,{'myEvent': this.myEvent});
  }

}
