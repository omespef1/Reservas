import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BookingProvider } from '../../providers/booking/booking';
import { transaction } from '../../class/Models/models';

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
  eventSource: any;
  viewTitle;
  isToday: boolean;
  calendar = {
    mode: 'month',
    currentDate: new Date(),
    locale: 'es-ES'
  }; // these are the variable used by the calendar.
  constructor(private _booking: BookingProvider) {
    this.loadEvents();
  }

  GetDisponibility() {
    var events = [];
    this._booking.GetDisponibility().then((resp: transaction) => {
      if (resp.ObjTransaction != null) {
        console.log(resp.ObjTransaction);
        for (let disp of resp.ObjTransaction) {
          events.push({
            title: 'Toca para reservar',
            startTime: new Date(disp.FechaInicio),
            endTime: new Date(disp.FechaFin),
            allDay: false
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
  }
  onEventSelected(event) {
    console.log('Event selected:' + event.startTime + '-' + event.endTime + ',' + event.title);
  }
  EventSelected(event){
    console.log('Event selected:' + event.startTime + '-' + event.endTime + ',' + event.title);
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
  }
  onCurrentDateChanged(event: Date) {
    var today = new Date();
    today.setHours(0, 0, 0, 0);
    event.setHours(0, 0, 0, 0);
    this.isToday = today.getTime() === event.getTime();
  }
  onRangeChanged(ev) {
    console.log('range changed: startTime: ' + ev.startTime + ', endTime: ' + ev.endTime);
  }
  markDisabled = (date: Date) => {
    var current = new Date();
    current.setHours(0, 0, 0);
    return date < current;
  };
}
