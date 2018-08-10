import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Refresher, ModalController } from 'ionic-angular';
import { timer } from 'rxjs/observable/timer';
//Providers
import { ClassSpacesProvider } from '../../providers/class-spaces/class-spaces';
import { ClassSpacesPage } from '../class-spaces/class-spaces';
import { BookingProvider } from '../../providers/booking/booking';
//clases
import { sessions } from '../../class/sessions/sessions';
import { general } from '../../class/general/general';
import { DigitalDatePipe} from '../../pipes/digital-date/digital-date';
//Pages
/**
 * Generated class for the BookingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-booking',
  templateUrl: 'booking.html',
})
export class BookingPage {
  user: any;
  bookings: any[];
  bookingsList: any[];
  cancelValue: number[] = [];
  constructor(public navCtrl: NavController,
    private _booking: BookingProvider,
    private session: sessions,
    private _general: general,
    private _classSpaces: ClassSpacesProvider,
    private modalCtrl: ModalController) {
  }

  ionViewDidLoad() {
    this.session.GetLoggedin().then(resp => {
      this.user = resp;
      this.GetBooking();
    })
  }

  GetBooking() {
    this._booking.GetBooking(this.user).then((resp: any) => {
      console.log(resp);
      if (resp.ObjTransaction != null) {
        this.bookings = resp.ObjTransaction;
        this.initializeItems();
      }
      else {
        this._general.showToastMessage('No tiene reservas aún!', 'bottom');
      }
    }), err => (console.log("problemas " + err));
  }
  newBooking() {
    this.navCtrl.push(ClassSpacesPage);
  }

  doRefresh(refresher: Refresher) {
    this._booking.GetBooking(this.user).then((resp: any) => {
      this.bookings = resp.ObjTransaction;
      this.initializeItems();
      refresher.complete();
      // this._general.showToastMessage('Reservas actualizadas!', 'bottom')
    }).catch(err => {
      this._general.showToastMessage(err, 'bottom')
      //Error
    })
  }
  initializeItems(): void {
    this.bookingsList = this.bookings;
  }
  getItems(q: string) {
    //Reseteo los items a su estado original
    this.initializeItems();
    //Si el valor es vacío ni filtra ndada
    if (!q || q.trim() === '') {
      return;
    }
    //Realiza el filtrado
    this.bookingsList = this.bookingsList.filter((v) => v.Res_nume.toString().indexOf(q.toString()) > -1 || v.Cla_nomb.toString().indexOf(q.toLowerCase()) > -1 || v.Esp_nomb.toString().indexOf(q.toLowerCase()) > -1);
  }

  CancelChange(booking: any, i: number) {
    if (this.cancelValue[i] == 80) {
      this._general.showMessageOption('Cancelar reserva', '¿Está seguro de que desea cancelar esta reserva? Esta operación no puede deshacerse.').then(() => {

        this.cancelBooking(booking, i);
        this.cancelValue=[];
      })
    }
    else {
      this.cancelValue[i] = 20;
    }

  }
  cancelBooking(booking: any, i: number) {
    //Se optiene la clase de espacio para verificar si ya se cumplió el tiempo de cancelación
    this._classSpaces.GetClassSpace(booking).then((resp: any) => {
      let fechaInicio = new Date(resp.FechaInicio);
      let fechaInicioPosible = this._general.addMinutes(resp.Cla_Tica);
      if (fechaInicioPosible > fechaInicio) {
        this._general.showToastMessage(`El plazo para cancelar la reserva  (${resp.Cla_Tica}) minuto(s) ha vencido.`, 'bottom')
        return;
      }
      //Se obtienen los items para llenar los motivos de rechazo
      this._booking.GetGnItems().then((resp: any) => {
        if (resp != null) {
          let items = resp.ObjTransaction;
          this._general.showConfirmMessage('Está seguro de que desea cancelar esta reserva?', 'Seleccione el motivo', items).then(resp => {
            if (resp != null && resp != 0) {
              let cancel = { justification: resp, id: booking.Res_cont }
              //Se cancela la reserva según el motivo de selección del usuario
              this._booking.cancelBooking(cancel).then((resp: any) => {
                if (resp != null) {
                  this._general.showToastMessage('La reserva se ha cancelado!', 'bottom');
                  this.ionViewDidLoad();
                }
                else {
                  this.cancelValue[i] = 20;
                }
              })
            }
          })
        }
      })

    })
  }

}
