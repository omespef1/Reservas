import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ItemSliding } from 'ionic-angular';
import { BookingProvider } from '../../providers/booking/booking';
import { sessions } from '../../class/sessions/sessions';
//models
import { user, bookingInfo, ecmcomp, product, gntoper, eccotiz } from '../../class/Models/models';
//pages
import { MainTemplatesPage } from '../main-templates/main-templates';
import { EventProductsPage } from '../event-products/event-products';
import { EventGntoperPage } from '../event-gntoper/event-gntoper';
//clases
import { general } from '../../class/general/general';
import { EventsProvider } from '../../providers/events/events';




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

  // bookings: bookingInfo[]=[];
  gntoper: gntoper;
  cotiz: eccotiz = new eccotiz();
  //plantillas seleccionadas

  user: user;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private _booking: BookingProvider,
    private _session: sessions,
    private _general: general,
    private _modal: ModalController,
    private _events: EventsProvider) {

    this._general.ShowMessageAlert('Mensaje de sistema', 'Deslice las reservas hacia la izquierda para configurar menús y equipos.')

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
  async GetUser() {
    this.user = <any>await this._session.GetLoggedin();
  }

  GetBookingsQuotation() {
    this._booking.GetBookinQuotation(this.user).then((resp: any) => {
      console.log(resp);
      if (resp != null) {
        this.cotiz.reservas = resp.ObjTransaction;
        console.log(this.cotiz.reservas);
      }
    })
  }

  GoMain(booking: bookingInfo, slide: ItemSliding) {
    // this.navCtrl.push(MainTemplatesPage);
    let modal = this._modal.create(MainTemplatesPage, { 'booking': booking });
    modal.present();
    modal.onDidDismiss((main: ecmcomp[]) => {
      booking.ecmcomp = main;
      this.validCheck(booking, slide);
      slide.close();
    })
  }
  GoProducts(booking: bookingInfo, slide: ItemSliding) {
    //  this.navCtrl.push(EventProductsPage,{'booking':booking})
    // this.navCtrl.push(MainTemplatesPage);
    let modal = this._modal.create(EventProductsPage, { 'booking': booking })
    modal.present();
    modal.onDidDismiss((products: product[]) => {
      booking.products = products;
      this.validCheck(booking, slide);
    })
  }


  validCheck(booking: bookingInfo, slide: ItemSliding) {
    if (booking.products != undefined && booking.products.length > 0 && booking.ecmcomp != undefined && booking.ecmcomp.length > 0)
      booking.checked = true;
    else
      booking.checked = false;
    slide.close();
  }
  Cancel(booking: bookingInfo, slide: ItemSliding) {

    this._general.showMessageOption('Cancelar reserva', '¿Está seguro de que desea cancelar esta reserva? Esta operación no puede deshacerse.').then(() => {

      this._booking.cancelBookings(booking).then((resp) => {
        if (resp != null && resp != 0) {
          this.ionViewDidLoad();
        }
      });

    }).catch(err => {

    })



  }
  save() {
    this._general.showMessageOption('Se requiere su confirmación', 'Por favor verifique los productos y menú asociados.Si confirma no podrá cambiarlos, desea continuar?')
      .then(() => {
        let modal = this._modal.create(EventGntoperPage, { 'bookings': this.cotiz.reservas });
        modal.present();
        modal.onDidDismiss((gntoper: gntoper) => {         
          this.BuildCotiz(gntoper:any);
          this.SendCotization();
        })
      }).catch(err => {
        console.log(err);
      })


  }

  BuildCotiz(toper:gntoper){
    this.cotiz.esp_codi = this.cotiz.reservas[0].esp_codi;
  }
   

//Envía la cotización
  SendCotization() {
    this._events.SetEcCotiz(this.cotiz);
  }

  Valid(): boolean {
    if (this.cotiz.reservas != null && this.cotiz.reservas.filter(b => b.checked == true && (b.products != undefined && b.products.length > 0) && (b.ecmcomp != undefined && b.ecmcomp.length > 0)).length > 0)
      return true;
  }
}
