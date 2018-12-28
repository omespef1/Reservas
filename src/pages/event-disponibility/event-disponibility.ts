import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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
  currentMonth:number;
  previewMonth:number;
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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventDisponibilityPage');
  }

}
