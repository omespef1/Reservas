import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Platform } from 'ionic-angular';
//models
import { bookingInfo, payment, user, transaction, bankTransactDone } from '../../class/models/models';
//clases
import { sessions } from '../../class/sessions/sessions';
import { general } from '../../class/general/general';
//providers
import { BookingProvider } from '../../providers/booking/booking';
import { PaymentProvider } from '../../providers/payment/payment';
//pages
import { ConfirmPaymentPage } from '../confirm-payment/confirm-payment';
import { BookingPage } from '../booking/booking';


/**
 * Generated class for the CarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-car',
  templateUrl: 'car.html',
})
export class CarPage {
  bookingCar: bookingInfo[] = [];
  total: number;
  tickeyID: number = 0;
  constructor(public navCtrl: NavController, public navParams: NavParams, private _sesion: sessions, private _general: general,
    private _payment: PaymentProvider, private _modal: ModalController, private _platform: Platform) {
  }

  ionViewDidLoad() {
    this.getBookingsCar();
  }


  async getBookingsCar() {
    this.bookingCar = <bookingInfo[]>await this._sesion.getShoppingList();
    
    if(this.bookingCar!=undefined)
    this.total = this.bookingCar.reduce((acc, pilot) => acc + pilot.res_valo, 0);
  }

  removeFromCar(booking: bookingInfo): void {
    this._sesion.removeFromShoppingList(booking).then(() => {
      this.getBookingsCar();
      this._general.showToastMessage(`La reserva ${booking.Res_cont} ha sido eliminada del carrito`, 'bottom');
    })
  }
  GoReservas() {
    this.navCtrl.setRoot(BookingPage);
  }
  payOffline() {
    this._sesion.removeCar();
    let offLinePayment = { 'online': false, 'bookings': this.bookingCar }
    this.navCtrl.push(ConfirmPaymentPage, { 'payment': offLinePayment });

  }
  async pay(): Promise<void> {
    
    let arrBookingNum: number[] = [];
    //Suma el total de las reservas en el carrito
    this.total = this.bookingCar.reduce((acc, pilot) => acc + pilot.res_valo, 0);
    //Consulta los datos del socio logueado
    const user: user = <user>await this._sesion.GetLoggedin()
    //Por cada reserva agrega el res_cont
    for (let book of this.bookingCar) {
      arrBookingNum.push(book.Res_cont);
    }
    let emp_codi: any = <any>await this._sesion.GetClientEmpCodi();
    let _pay: payment = {
      sbe_codi: user.Sbe_codi, emp_codi: emp_codi, sbe_ncar: user.Sbe_ncar, valor: this.total,
      soc_mail: user.Sbe_mail, productos: arrBookingNum,dpa_tabla:'AE_RESER'
    }
    this._payment.CreateTransactionPayment(_pay).then((resp: transaction) => {
      if (resp != null) {
        if (resp.Retorno == 0) {
          //Elimina el carrito de compra
          this._sesion.removeCar();
          this._general.ShowMessageAlertAction('Pasaralea de pago', 'Se abrirá una ventana de su navegador para realizar el pago, una vez finalice la transacción asegúrese de volver a la aplicación.')
            .then((touch) => {            
            
              this.tickeyID = resp.ObjTransaction.TicketId;
              this._general.openBrowser(resp.ObjTransaction.eCollectUrl)
              this._platform.resume.subscribe(() => {
              
                if (this.tickeyID > 0) {
                  let paymentConfirm = { 'ticket': this.tickeyID, 'online': true }
                  let modal = this._modal.create(ConfirmPaymentPage, { 'payment': paymentConfirm });
                  this._platform.resume.unsubscribe();
                  modal.present();
                  modal.onDidDismiss(()=>{
                    this.navCtrl.insert(0,BookingPage);
                    this.navCtrl.popToRoot();
                  })

                }
              });

              // appBroser.on('exit').subscribe(resp=>{         

              // })
            })

        }
      }
    })
  }



}
