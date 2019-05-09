import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, ModalController, ViewController } from 'ionic-angular';
import { eccotiz, payment, user, transaction } from '../../class/models/models';
import { sessions } from '../../class/sessions/sessions';
import { PaymentProvider } from '../../providers/payment/payment';
import { EventsPage } from '../events/events';
import { general } from '../../class/general/general';
import { ConfirmPaymentPage } from '../confirm-payment/confirm-payment';
import { EventCotizProductsPage } from '../event-cotiz-products/event-cotiz-products';
import { BookingPage } from '../booking/booking';

/**
 * Generated class for the EventCotizDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-event-cotiz-detail',
  templateUrl: 'event-cotiz-detail.html',
})
export class EventCotizDetailPage {
  cotiz: eccotiz = new eccotiz();
  tickeyID: number = 0;
  user: any={};
  constructor(private navCtrl: NavController, public navParams: NavParams, private _sesion: sessions,
    private _payment: PaymentProvider, private _general: general, private _platform: Platform, private _modal: ModalController,
    private _view: ViewController) {
    this.cotiz = this.navParams.get('cotiz');
  }

  ionViewDidLoad() {
    this._sesion.GetLoggedin().then((resp: user) => {
      this.user = resp;
    })

  }
  async pay() {
    let arrContiz: number[] = [];
    arrContiz.push(this.cotiz.cot_cont);

    let emp_codi = this._sesion.GetClientEmpCodi();
    let _pay: payment = {
      sbe_codi: this.user.Sbe_codi, emp_codi: emp_codi, sbe_ncar: this.user.Sbe_ncar, valor: this.cotiz.cot_vato,
      soc_mail: this.user.Sbe_mail, productos: arrContiz, dpa_tabla: 'EC_COTIZ'
    }
    this._payment.CreateTransactionPayment(_pay).then((resp: transaction) => {
      if (resp != null) {
        if (resp.Retorno == 0) {
          //Elimina el carrito de compra
          this._sesion.removeCar();
          this._general.ShowMessageAlertAction('Pasaralea de pago', 'Se abrirá una ventana de su navegador para realizar el pago, una vez finalice la transacción asegúrese de volver a la aplicación.')
            .then((touch) => {
              console.log(resp);
              this.tickeyID = resp.ObjTransaction.TicketId;
              this._general.openBrowser(resp.ObjTransaction.eCollectUrl)
              this._platform.resume.subscribe(() => {

                if (this.tickeyID > 0) {
                  let paymentConfirm = { 'ticket': this.tickeyID, 'online': true }
                  let modal = this._modal.create(ConfirmPaymentPage, { 'payment': paymentConfirm });
                  this._platform.resume.unsubscribe();
                  modal.present();
                  modal.onDidDismiss(() => {
                    this.navCtrl.insert(0, EventsPage);
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

  // close() {
  //   this._view.dismiss();
  // }

  seePay(){
    let payment = {'booking':this.cotiz,'online':true}
    this.navCtrl.push(ConfirmPaymentPage,{ 'payment' : payment});
  }
 

  seeBookings(cotiz:eccotiz){
    this.navCtrl.push(EventCotizProductsPage,{ 'cotiz' : cotiz});
  }
  paySite(){    


   this._payment.CreateVoucherCotiz(this.cotiz).then((resp:transaction)=>{
     if(resp!= null){
      this._general.showToastMessage(`Se ha enviado un email a ${this.user.Sbe_mail} con la información.`,'bottom');
      this._view.dismiss();
     }
     
   });
  }
}
