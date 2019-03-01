import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, UrlSerializer } from 'ionic-angular';
//providers
//
//models
import {disponibilityRequestEvent, transaction,disponibilityResponseEvent,booking, user}  from '../../class/Models/models';
//providers
import {BookingProvider}  from '../../providers/booking/booking';
import { isRightSide } from 'ionic-angular/umd/util/util';
import * as moment from 'moment';
import {sessions} from '../../class/sessions/sessions';
//pages
import {EventConfirmPage} from '../event-confirm/event-confirm';

/**
 * Generated class for the EventDisponibilityPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-event-disponibility',
  templateUrl: 'event-disponibility.html',
})
export class EventDisponibilityPage {
  newBooking : booking = new booking();
  eventSource: any;
  formatWeekTitle: "MMMM yyyy, 'Semana' w'";
  noEventsLabel: string = "No hay disponibilidad para este día";
  viewTitle;
  isToday: boolean;
  calendar = {
    mode: 'month',
    currentDate: new Date(),
    locale: 'es-ES'
  };
  myEvent:disponibilityRequestEvent;
  constructor(public navCtrl: NavController, public navParams: NavParams,private _booking:BookingProvider,private _session:sessions) {

  }

  ionViewDidLoad() {
   this.myEvent = this.navParams.get("myEvent");
   //this.showDisponibility();
  }

   showDisponibility(){
    this._booking.GetDisponibilityEvents(this.myEvent).then((transactionDisponibility:transaction)=>{      
      if(transactionDisponibility!=null && transactionDisponibility.ObjTransaction!=null){
        var events = [];
        let eventsFilter: disponibilityResponseEvent[] =transactionDisponibility.ObjTransaction;
        for (let disp of eventsFilter) {
          console.log(this.myEvent.dho_hori.split(':')[1]);
          events.push({
            title: disp.esp_nomb,
            startTime:new Date(moment(new Date(disp.dho_hori).setHours(Number(this.myEvent.dho_hori.split(':')[0]),Number(this.myEvent.dho_hori.split(':')[1]))).toISOString()),
            endTime: new Date(moment(new Date(disp.dho_hori).setHours(Number(this.myEvent.dho_horf.split(':')[0]),Number(this.myEvent.dho_horf.split(':')[1]))).toISOString()),
            allDay: false,  
            esp_cont: disp.esp_cont,   
            esp_codi:disp.esp_codi,
            cla_cont:disp.cla_cont,
            cla_codi:disp.cla_codi,
            arb_usuc:disp.arb_sucu,       
          })
        }
        this.eventSource = events;
        console.log(this.eventSource);
       }
    })

  }
  onViewTitleChanged(title) {
    this.viewTitle = title;   
    if(this.calendar.mode=="month")
    this.showDisponibility();

  }
  changeMode(mode) {
    this.calendar.mode = mode;
  }
   onEventSelected(event) {
    console.log('onEventSelected');
    console.log('Event selected:' + event.startTime + '-' + event.endTime + ',' + event.title); 

    this.buildBooking(event);
    
  }


  EventSelected(event){
  this.buildBooking(event);
  }

  buildBooking(event){
    this._session.GetLoggedin().then((resp:user)=>{
      this.newBooking.Mac_nume = resp.Mac_nume;
      this.newBooking.Sbe_cont = resp.Sbe_cont;
      this.newBooking.Soc_cont = resp.Soc_cont;
      this.newBooking.Ter_codi=0;
      this.newBooking.Res_fini = event.startTime.toISOString();
      this.newBooking.Res_fina =event.endTime.toISOString();
      this.newBooking.Esp_cont = event.esp_cont;     
      this.newBooking.Res_tdoc= 0,
      this.newBooking.Res_dinv= 0,
      this.newBooking.Res_ninv= "",
      this.newBooking.Res_inac= "",
      this.newBooking.Cla_cont= event.cla_cont;
      this.newBooking.Esp_mdit= "N";
      this.newBooking.arb_sucu= event.arb_sucu;               
      this.navCtrl.push(EventConfirmPage,{'myBooking':this.newBooking,'event':event});
    })
  }
  onCurrentDateChanged(event: Date) {
    console.log('onCurrentDateChanged');
    var today = new Date();
    today.setHours(0, 0, 0, 0);
    event.setHours(0, 0, 0, 0);
    this.isToday = today.getTime() === event.getTime();  
    // this.myEvent.dho_mesp = event.getMonth();
    // this.myEvent.dhop_anop = event.getFullYear();
    
  }
  onRangeChanged(ev) {
   
  }
  onTimeSelected(ev) {
   

  }
}
