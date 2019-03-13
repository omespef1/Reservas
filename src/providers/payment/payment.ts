import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
//provider
import {ComunicationsProvider} from '../comunications/comunications';
import { bookingInfo, transaction } from '../../class/models/models';
import { sessions } from '../../class/sessions/sessions';
import { general } from '../../class/general/general';
import { Platform,ModalController, NavController } from 'ionic-angular';
import { ConfirmPaymentPage } from '../../pages/confirm-payment/confirm-payment';

/*
  Generated class for the PaymentProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PaymentProvider {
  tickeyID:number=0;

  constructor(private _comu:ComunicationsProvider,private _sesion:sessions,private _general:general,private _platform:Platform,
    private _modal:ModalController,private navCtrl:NavController) {
    console.log('Hello PaymentProvider Provider');
  }
  CreateTransactionPayment(payment:any){
     return this._comu.Post(payment,'Pagos');
  }
  GetTransactionInformation(ticketId:number){
    return this._comu.Get(`Pagos/${ticketId}`,true,'Consultando el estado de la transacción...',false);
  }
  CreateVoucher(bookings:bookingInfo[]){
  return this._comu.Put(bookings,'Pagos','Generando voucher...');
  }

  // InitPayment(_pay:any,targetPage:any){    
  //   this.CreateTransactionPayment(_pay).then((resp: transaction) => {
  //     if (resp != null) {
  //       if (resp.Retorno == 0) {
      
  //         // //Elimina el carrito de compra
  //         // this._sesion.removeCar();
  //         this._general.ShowMessageAlertAction('Pasaralea de pago', 'Se abrirá una ventana de su navegador para realizar el pago, una vez finalice la transacción asegúrese de volver a la aplicación.')
  //           .then((touch) => {            
  //             console.log(resp);
  //             this.tickeyID = resp.ObjTransaction.TicketId;
  //             this._general.openBrowser(resp.ObjTransaction.eCollectUrl)
  //             this._platform.resume.subscribe(() => {              
  //               if (this.tickeyID > 0) {
  //                 let paymentConfirm = { 'ticket': this.tickeyID, 'online': true }
  //                 let modal = this._modal.create(ConfirmPaymentPage, { 'payment': paymentConfirm });
  //                 this._platform.resume.unsubscribe();
  //                 modal.present();
  //                 modal.onDidDismiss(()=>{                    
  //                   this.navCtrl.insert(0,targetPage);
  //                   this.navCtrl.popToRoot();
  //                 })

  //               }
  //             });
  //           })

  //       }
  //     }
  //   })
  // }
}
