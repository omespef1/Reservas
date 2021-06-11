import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  Refresher,
  ModalController,
} from "ionic-angular";
//providers
import { BookingProvider } from "../../providers/booking/booking";
//clases
import { transaction } from "../../class/models/models";
import {
  Ifactory,
  disponibilityRequest,
  DisponibilityTime,
} from "../../class/models/models";
import { general } from "../../class/general/general";
import { sessions } from "../../class/sessions/sessions";
//pages
import { ConfirmPage } from "../confirm/confirm";
import { ThirdPartiesPage } from "../../pages/third-parties/third-parties";
import { ThirdPartiesProvider } from "../../providers/third-parties/third-parties";
//pipe
import { DigitalDatePipe } from "../../pipes/digital-date/digital-date";
import * as moment from "moment";
import { EventInvitedBookingPage } from "../event-invited-booking/event-invited-booking";

/**
 * Generated class for the DisponibilityPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-disponibility",
  templateUrl: "disponibility.html",
})
export class DisponibilityPage {
  currentMonth: number;
  newFactory: Ifactory;
  newBookingRequest = new disponibilityRequest();
  eventSource: any;
  formatWeekTitle: "MMMM yyyy, 'Semana' w'";
  noEventsLabel: string = "No hay disponibilidad para este día";
  viewTitle;
  isToday: boolean;
  calendar = {
    mode: "month",
    currentDate: new Date(),
    locale: "es-ES",
  };

  constructor(
    private _booking: BookingProvider,
    private _nav: NavParams,
    private _navCtrl: NavController,
    private _third: ThirdPartiesProvider,
    private _general: general,
    private _sesion: sessions
  ) {
    this.newFactory = _nav.get("booking");
    let currentDate = new Date();
    this.newBookingRequest.year = currentDate.getFullYear();
    this.newBookingRequest.day = currentDate.getDay();
    this.newBookingRequest.month = currentDate.getMonth();
    this.newBookingRequest.Cla_cont = this.newFactory.class.Cla_cont;
    this.newBookingRequest.esp_mdit = this.newFactory.product.esp_mdit;
    this.newBookingRequest.Op_Disp = this.newFactory.optionDisp.OpDisp;
    this.newBookingRequest.pro_cont = this.newFactory.product.Pro_cont;
    if (
      this.newFactory.optionDisp.OpDisp != "F" &&
      this.newFactory.product.esp_mdit == "S"
    )
      this.newBookingRequest.ter_codi = this.newFactory.thirdPartie.Ter_codi;
    else {
      this.newFactory.thirdPartie = { Ter_codi: 0 };
      this.newBookingRequest.ter_codi = 0;
    }

    if (
      this.newFactory.optionDisp.OpDisp != "F" &&
      this.newFactory.product.esp_mdit == "S"
    )
      this.noEventsLabel = "Este profesional no tiene disponibilidad";
    //    this.loadEvents();
  }

  GetDisponibility(ref: Refresher = null) {
    var events = [];
    let eventsAvailable: DisponibilityTime[];
    this._booking
      .GetDisponibility(this.newBookingRequest)
      .then((resp: transaction) => {
        if (resp != null && resp.ObjTransaction != null) {
          eventsAvailable = resp.ObjTransaction;
          if (ref) ref.complete();
          if (this.newFactory.class.Cla_Fchr != null) {
            let maxDate: Date = this.newFactory.class.Cla_Fchr;
            eventsAvailable.filter((v) => v.FechaInicio <= maxDate);
          } else eventsAvailable = resp.ObjTransaction;
          //Convertimos las fechas de la bd a objetos entendibles para el source del componente de caledndario
          for (let disp of eventsAvailable) {
            events.push({
              title: `${moment(disp.FechaInicio).format("hh:mm A")}- ${moment(
                disp.FechaFin
              ).format("hh:mm A")}`,
              startTime: new Date(moment(disp.FechaInicio).toISOString()),
              endTime: new Date(moment(disp.FechaFin).toISOString()),
              allDay: false,
              age_Fini: disp.FechaInicio,
              age_Fina: disp.FechaFin,
              esp_cont: disp.esp_cont,
              Estado: disp.Estado,
              express:disp.Express,
              minutes:disp.Minutes
            });
          }
          this.eventSource = events;
        }
      });
  }
  loadEvents() {
    this.GetDisponibility();
  }
  onViewTitleChanged(title) {
    this.viewTitle = title;

    if (this.calendar.mode == "month") this.loadEvents();
  }
  onEventSelected(event) {
    this.setBooking(event);
  }
  EventSelected(event) {
    this.setBooking(event);
  }
  changeMode(mode) {
    this.calendar.mode = mode;
  }
  today() {
    this.calendar.currentDate = new Date();
  }
  onTimeSelected(ev) {}
  onCurrentDateChanged(event: Date) {
    var today = new Date();
    today.setHours(0, 0, 0, 0);
    event.setHours(0, 0, 0, 0);
    this.isToday = today.getTime() === event.getTime();
    this.currentMonth = event.getMonth();
    this.newBookingRequest.year = event.getFullYear();
    this.newBookingRequest.month = event.getMonth();
  }
  onRangeChanged(ev) {}
  markDisabled = (date: Date) => {
    var current = new Date();
    current.setHours(0, 0, 0);
    return date < current;
  };
  setBooking(event: any) {
    try {
      if(this.newFactory.class.Cla_Fchr!=null){
        let maxDate =new Date(this.newFactory.class.Cla_Fchr);
        // if(new Date(event.startTime) > maxDate)
        // throw Error(`Fecha Límite de reserva excedida ${this.newFactory.class.Cla_Fchr}:`)
      }
      this.newFactory.agend = event;
            //Si ya majena disponibilidad significa que ya elegí el tercero
          if (this.newFactory.product.esp_mdit == 'S' && this.newFactory.optionDisp.OpDisp=='F') {
               this._navCtrl.push(ThirdPartiesPage, { 'booking': this.newFactory });
          }
          else {
            this._navCtrl.push(ConfirmPage, { 'booking': this.newFactory });
          }
    }
    catch (err) {
      this._general.showToastMessage(err, 'bottom');
    }
    }
  
}
