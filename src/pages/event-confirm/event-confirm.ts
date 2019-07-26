import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
//models
import {booking,disponibilityRequestEvent, transaction} from '../../class/models/models';
//providers
import {BookingProvider} from '../../providers/booking/booking';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import * as moment from 'moment';
import { stringify } from '@angular/core/src/util';
import {general} from '../../class/general/general';
//pages
import {RunwayEventPage} from '../runway-event/runway-event';
//clases
import {sessions} from '../../class/sessions/sessions';

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
   mySelectedEvent: any;
   myEventDetails:disponibilityRequestEvent;
   price:string;
   
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private _booking:BookingProvider,
    private _general:general,
    private _sesion:sessions) {
    this.mySelectedEvent = navParams.get("event");
    this.MyEventBooking = navParams.get("myBooking");
    this.myEventDetails = navParams.get("eventDetails");
    
  }

  ionViewDidLoad() {

  }




  MakeBooking(){
    this.MyEventBooking.cotizacionExpress=true;
    this._booking.SetBooking(this.MyEventBooking).then((resp:any)=>{
     
      if(resp!=null){
         if(resp.InvoiceId==0){
           this._general.ShowMessageAlert('Reserva no realizada', `${resp.TxtError}`);
           return;
         }
         this._sesion.SetEventQuantity(this.myEventDetails.esp_capa);
           this._general.ShowMessageAlert('Reserva realizada!', `Se ha creado la reserva número ${resp.InvoiceId}, puede ver los detalles o cancelarla en la sección mis reservas.`);
          //  this._sesion.SetEventPending(this.myEventDetails);
           this.navCtrl.setRoot(RunwayEventPage);
          
         }
    })
  }
}
