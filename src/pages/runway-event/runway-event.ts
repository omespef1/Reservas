import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {BookingProvider} from '../../providers/booking/booking';
import {sessions} from '../../class/sessions/sessions';
//models
import {user,bookingInfo, ecmcomp, product} from '../../class/Models/models';
//pages
import {MainTemplatesPage} from '../main-templates/main-templates';
import {EventProductsPage} from '../event-products/event-products';
//clases
import {general} from '../../class/general/general';




/**
 * Generated class for the RunwayEventPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-runway-event',
  templateUrl: 'runway-event.html',
})
export class RunwayEventPage {

  bookings: bookingInfo[];
  products:product[];
  //plantillas seleccionadas
  ecmcomp: ecmcomp[];
  user:user;
  ec
  constructor(public navCtrl: NavController, public navParams: NavParams, private _booking:BookingProvider,private _session:sessions,private _general:general) {
  }

  async ionViewDidLoad() {
    //cargue de usuario desde la sesión
     await this.GetUser();
     //Carga de reservas para la clase evento parametrizada en AEPARAM
     this.GetBookingsQuotation();

  }
  public ionViewWillEnter() {
    this.ecmcomp = this.navParams.get('ecmcomp')|| null;
    this.products = this.navParams.get('products')|| null; 
}
async GetUser(){
this.user = <any> await this._session.GetLoggedin();
}

  GetBookingsQuotation(){
    this._booking.GetBookinQuotation(this.user).then((resp: any) => {
      console.log(resp);
      if (resp != null) {
        this.bookings = resp.ObjTransaction;
        console.log(this.bookings);       
      }    
    })
  }

  GoMain(){
    this.navCtrl.push(MainTemplatesPage);
  }
  GoProducts(booking:bookingInfo){
 this.navCtrl.push(EventProductsPage,{'booking':booking})
  }
  Cancel(booking: bookingInfo) {
  
      this._general.showMessageOption('Cancelar reserva', '¿Está seguro de que desea cancelar esta reserva? Esta operación no puede deshacerse.').then(() => {

        this._booking.cancelBookings(booking);
     
      })
  
 

  }
}
