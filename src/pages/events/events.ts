import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
//providers
import { EventsProvider } from '../../providers/events/events';
//models
import { user, transaction } from '../../class/Models/models';
//class
import { sessions } from '../../class/sessions/sessions'
//pages
import {NewEventPage} from '../new-event/new-event';


/**
 * Generated class for the EventsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-events',
  templateUrl: 'events.html',
})
export class EventsPage {
  events: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private _events: EventsProvider, private _sesion: sessions) {
  }

  ionViewDidLoad() {
    this.GetEvents();
  }

  async GetEvents() {
      //Carga los eventos del usuario según la fecha de ingreso al app
    const localUser: user = <user>await this._sesion.GetLoggedin();
    let eventsTransaction: transaction = <transaction>await this._events.GetEvents(localUser.Soc_cont, localUser.Sbe_cont, localUser.Mac_nume, new Date());
    if (eventsTransaction != null && eventsTransaction.Retorno == 0) {
      this.events = eventsTransaction.ObjTransaction;
    }
  }
  NewEvent(){
    this.navCtrl.push(NewEventPage);
  }

}
