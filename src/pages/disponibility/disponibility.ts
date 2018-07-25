import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
//providers
import { BookingProvider } from '../../providers/booking/booking';
//clases
import { transaction } from '../../class/Models/models';
import { Ifactory, disponibilityRequest } from '../../class/Models/models';
import { general } from '../../class/general/general';
//pages
import { ConfirmPage } from '../confirm/confirm';
import { ThirdPartiesProvider } from '../../providers/third-parties/third-parties';


/**
 * Generated class for the DisponibilityPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-disponibility',
  templateUrl: 'disponibility.html',
})
export class DisponibilityPage {
  newFactory: Ifactory;
  newBookingRequest = new disponibilityRequest();
  eventSource: any;
  noEventsLabel: string = "No hay disponibilidad para este día";
  viewTitle;
  isToday: boolean;
  calendar = {
    mode: 'month',
    currentDate: new Date(),
    locale: 'es-ES'
  };

  constructor(private _booking: BookingProvider,
    private _nav: NavParams,
    private _navCtrl: NavController,
    private _third: ThirdPartiesProvider,
    private _general: general) {
    this.newFactory = _nav.get('booking');
    let currentDate = new Date();
    this.newBookingRequest.year = currentDate.getFullYear();
    this.newBookingRequest.day = currentDate.getDay();
    this.newBookingRequest.month = currentDate.getMonth();
    this.newBookingRequest.Cla_cont = this.newFactory.class.Cla_cont;
    this.newBookingRequest.esp_mdit = this.newFactory.product.esp_mdit;
    this.newBookingRequest.Op_Disp = this.newFactory.optionDisp.OpDisp;
    this.newBookingRequest.pro_cont = this.newFactory.product.Pro_cont;
    if (this.newFactory.optionDisp.OpDisp != 'F' && this.newFactory.product.esp_mdit == 'S')
      this.newBookingRequest.ter_codi = this.newFactory.thirdPartie.Ter_codi;
    else {
      this.newFactory.thirdPartie = { Ter_codi: 0 }
      this.newBookingRequest.ter_codi = 0;
    }

    if (this.newFactory.optionDisp.OpDisp != 'F' && this.newFactory.product.esp_mdit == 'S')
      this.noEventsLabel = 'Este profesional no tiene disponibilidad';
    this.loadEvents();
  }

  GetDisponibility() {
    var events = [];
    let eventsAvailable: any[];
    this._booking.GetDisponibility(this.newBookingRequest).then((resp: transaction) => {
      if (resp.ObjTransaction != null) {
        console.log(resp.ObjTransaction);
        eventsAvailable = resp.ObjTransaction;
        if (this.newFactory.class.Cla_Fchr != null) {
          let maxDate: Date = this.newFactory.class.Cla_Fchr;
          eventsAvailable.filter((v) => v.FechaInicio <= maxDate);
        }
        else
          eventsAvailable = resp.ObjTransaction;


        for (let disp of eventsAvailable) {
          events.push({
            title: 'Disponible',
            startTime: new Date(disp.FechaInicio),
            endTime: new Date(disp.FechaFin),
            allDay: false,
            esp_cont: disp.esp_cont,
            Estado: disp.Estado
          })
        }
        this.eventSource = events;

      }
    })
  }


  loadEvents() {
    this.GetDisponibility();
  }
  onViewTitleChanged(title) {
    this.viewTitle = title;

    console.log(title);
  }
  onEventSelected(event) {
    console.log('onEventSelected');
    console.log('Event selected:' + event.startTime + '-' + event.endTime + ',' + event.title);
    this.setBooking(event);

  }
  EventSelected(event) {
    console.log('EventSelected');
    console.log('Event selected:' + event.startTime + '-' + event.endTime + ',' + event.title);
    this.setBooking(event);
  }
  changeMode(mode) {
    this.calendar.mode = mode;
  }
  today() {
    this.calendar.currentDate = new Date();
  }
  onTimeSelected(ev) {
    console.log('Selected time: ' + ev.selectedTime + ', hasEvents: ' +
      (ev.events !== undefined && ev.events.length !== 0) + ', disabled: ' + ev.disabled);
    console.log('onTimeSelected');

  }
  onCurrentDateChanged(event: Date) {
    console.log('onCurrentDateChanged');
    var today = new Date();
    today.setHours(0, 0, 0, 0);
    event.setHours(0, 0, 0, 0);
    this.isToday = today.getTime() === event.getTime();
  }
  onRangeChanged(ev) {
    console.log('rango cambiado');
    console.log('range changed: startTime: ' + ev.startTime + ', endTime: ' + ev.endTime);
  }
  markDisabled = (date: Date) => {
    var current = new Date();
    current.setHours(0, 0, 0);
    return date < current;
  };
  setBooking(event: any) {
    try {
      this.newFactory.agend = event;
      this.newFactory.agend.startTime = new Date(event.startTime);
      this.newFactory.agend.endTime = new Date(event.endTime);
      if (this.newFactory.optionDisp.OpDisp != 'F' && this.newFactory.product.esp_mdit == 'S') {
        this.newBookingRequest.startTime = this.newFactory.agend.startTime;
        this.newBookingRequest.endTime = this.newFactory.agend.endTime;
        this._third.GetThirParties(this.newBookingRequest).then((resp: transaction) => {
          let terceros: any[] = resp.ObjTransaction;
          if (terceros.length == 0)
            throw new Error("No hay disponibilidad de instructores!");
          if (terceros.length == 0)
            this.newFactory.thirdPartie = terceros[0];
        })
      }
      this._navCtrl.push(ConfirmPage, { 'booking': this.newFactory });
    }
    catch (err) {
      this._general.showToastMessage(err, 'bottom');
    }

  }
}
