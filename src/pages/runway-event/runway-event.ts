import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ModalController } from 'ionic-angular';
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
 
  //plantillas seleccionadas

  user:user;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    private _booking:BookingProvider,
    private _session:sessions,
    private _general:general,
    private _modal:ModalController) {
  }

  async ionViewDidLoad() {
    //cargue de usuario desde la sesión
     await this.GetUser();
     //Carga de reservas para la clase evento parametrizada en AEPARAM
     this.GetBookingsQuotation();

  }
  public ionViewWillEnter() {
    // this.ecmcomp = this.navParams.get('ecmcomp')|| null;
    // this.products = this.navParams.get('products')|| null; 
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

  GoMain(booking:bookingInfo){
    // this.navCtrl.push(MainTemplatesPage);
    let modal = this._modal.create({
      MainTemplatesPage
    });
    modal.present();
    modal.onDidDismiss((main:ecmcomp[])=>{
      booking.ecmcomp = main;
    })
  }
  GoProducts(booking:bookingInfo){
//  this.navCtrl.push(EventProductsPage,{'booking':booking})
  // this.navCtrl.push(MainTemplatesPage);
  let modal = this._modal.create(EventProductsPage,{'booking':booking})
  modal.present();
  modal.onDidDismiss((products:product[])=>{
    booking.products = products;
  })
  }
  Cancel(booking: bookingInfo) {
  
      this._general.showMessageOption('Cancelar reserva', '¿Está seguro de que desea cancelar esta reserva? Esta operación no puede deshacerse.').then(() => {

        this._booking.cancelBookings(booking).then(()=>{
          this.ionViewDidLoad();
        });
     
      })
  
 

  }
  save(){
    //let modal:ModalController = this._modal.create({})
    

  }
}
