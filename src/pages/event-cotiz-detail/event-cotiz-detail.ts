import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, ModalController } from 'ionic-angular';
import { eccotiz, payment, user, transaction } from '../../class/models/models';
import { sessions } from '../../class/sessions/sessions';
import { PaymentProvider } from '../../providers/payment/payment';
import { EventsPage } from '../events/events';
import { general } from '../../class/general/general';
import { ConfirmPaymentPage } from '../confirm-payment/confirm-payment';

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
 cotiz:eccotiz=new eccotiz();
 tickeyID:number=0;
  constructor(private navCtrl: NavController, public navParams: NavParams,private _sesion:sessions,
    private _payment:PaymentProvider,private _general:general,private _platform:Platform,private _modal:ModalController) {
    this.cotiz = this.navParams.get('cotiz');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventCotizDetailPage');
  }
async pay(){
  let arrContiz: number[] = [];
  arrContiz.push(this.cotiz.cot_cont);
  let user:user = <user> await this._sesion.GetLoggedin();
  let emp_codi = this._sesion.GetClientEmpCodi();
  let _pay: payment = {
    sbe_codi: user.Sbe_codi, emp_codi: emp_codi, sbe_ncar: user.Sbe_ncar, valor: this.cotiz.cot_vato,
    soc_mail: user.Sbe_mail, productos: arrContiz
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
                modal.onDidDismiss(()=>{
                  this.navCtrl.insert(0,EventsPage);
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
