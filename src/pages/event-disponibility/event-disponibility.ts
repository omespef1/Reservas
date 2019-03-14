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
        console.log(eventsFilter);
        for (let disp of eventsFilter) {
          
          events.push({
            title: disp.esp_nomb,
            startTime: new Date(disp.dho_hori),
            endTime: new Date(disp.dho_horf),
            allDay: false,  
            esp_cont: disp.esp_cont,   
            esp_codi:disp.esp_codi,
            cla_cont:disp.cla_cont,
            cla_codi:disp.cla_codi,
            arb_sucu:disp.arb_sucu,
            product:disp.product,    
            dho_hori: disp.dho_hori, 
            dho_horf:disp.dho_horf,
            hours: disp.hours,
            minutes:disp.minutes
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
  today() {
    this.calendar.currentDate = new Date();
  }
  buildBooking(event){
    this._session.GetLoggedin().then((resp:user)=>{    
      let newBooking: any = {
        Emp_codi: this._session.GetClientEmpCodi(),
        Res_fini: event.dho_hori,
        Res_fina: event.dho_horf,
        Soc_cont: resp.Soc_cont,
        Mac_nume: resp.Mac_nume1,
        Sbe_cont: resp.Sbe_cont,
        Esp_cont:  event.esp_cont,
        Res_numd: 0,
        Ite_cont: 10207,
        Ter_codi: 0,
        Res_tdoc: 0,
        Res_dinv: 0,
        Res_ninv: "",
        Res_inac: "",
        Cla_cont: event.cla_cont,
        Esp_mdit: "N",
        arb_sucu:event.arb_sucu,
        cotizacionExpress:true,   
        Productos: [ event.product]   
      }
      this.navCtrl.push(EventConfirmPage,{'myBooking':newBooking,'event':event, 'eventDetails': this.myEvent});
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
