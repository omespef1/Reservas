import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Refresher } from 'ionic-angular';
//Providers
import { ClassSpacesProvider } from '../../providers/class-spaces/class-spaces';
import { ClassSpacesPage } from '../class-spaces/class-spaces';
import { BookingProvider } from '../../providers/booking/booking';
//clases
import { sessions } from '../../class/sessions/sessions';
import { general } from '../../class/general/general';

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
  cancelValue:number;
  constructor(public navCtrl: NavController, private _booking: BookingProvider, private session: sessions, private _general: general) {

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
        this._general.showToastMessage('No tiene reservas aún!','bottom');
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

  CancelChange(){
    console.log(this.cancelValue)
    if(this.cancelValue==80){
       this._general.showMessageOption('Cancelar reserva','¿Está seguro de que desea cancelar esta reserva? Esta operación no puede deshacerse.').then(()=>{
         console.log('cancelada');
         this.ionViewDidLoad();
       })
    }
    else{
      console.log('d');
      this.cancelValue=20;
    }

  }
}
