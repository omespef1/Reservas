import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ModalController } from 'ionic-angular';
//providers
import { EventsProvider } from '../../providers/events/events';
//models
import { user, transaction,eccotiz } from '../../class/models/models';
//class
import { sessions } from '../../class/sessions/sessions'
//pages
import {NewEventPage} from '../new-event/new-event';
import { EventCotizDetailPage } from '../event-cotiz-detail/event-cotiz-detail';


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
  cotiz: eccotiz[];
  eventsVisible=true;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    private _events: EventsProvider, 
    private _sesion: sessions,
    private _modal:ModalController) {
  }

  ionViewDidLoad() {
    this.GetConfigEvents();
    this.GetEvents();
  }

  async GetEvents() {
      //Carga los eventos del usuario según la fecha de ingreso al app
    const localUser: user = <user>await this._sesion.GetLoggedin();
    let eventsTransaction: transaction = <transaction>await this._events.GetEvents(localUser.Soc_cont, localUser.Sbe_codi, localUser.Mac_nume1);
    if (eventsTransaction != null && eventsTransaction.Retorno == 0) {
      this.cotiz = eventsTransaction.ObjTransaction;
    }
  }
  NewEvent(){
    this.navCtrl.push(NewEventPage);
  }
  seeDetails(cotiz:eccotiz){
let modal = this._modal.create(EventCotizDetailPage,{'cotiz':cotiz});
   modal.present();
   modal.onDidDismiss(()=>{
     this.ionViewDidLoad();
   })
  }

  GetConfigEvents(){
    return this._events.GetEcEvents().then((resp:transaction)=>{
       console.log(resp);
       if(resp==null){
       console.log('pestaña desactivada');
              this.eventsVisible=false;
        
       }
     })
    }

}
