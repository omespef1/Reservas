import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ModalController } from 'ionic-angular';
//Models
import { bookingInfo , payment, user,transaction,bankTransactDone} from '../../class/Models/models';
//clases
import { sessions } from '../../class/sessions/sessions';
import { general } from '../../class/general/general';
//providers
import { BookingProvider } from '../../providers/booking/booking';
import {PaymentProvider} from '../../providers/payment/payment';
//pages
import {ConfirmPaymentPage} from '../confirm-payment/confirm-payment';


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
  bookingCar: bookingInfo[];
  total: number;
  tickeyID :number=0;
  constructor(public navCtrl: NavController, public navParams: NavParams, private _sesion: sessions, private _general: general,
    private _payment:PaymentProvider,private _modal:ModalController) {
  }

  ionViewDidLoad() {
    this.getBookingsCar();
  }


  async getBookingsCar() {
    this.bookingCar = <bookingInfo[]>await this._sesion.getShoppingList();
    console.log(this.bookingCar);
    this.total = this.bookingCar.reduce((acc, pilot) => acc + pilot.res_valo, 0);
  }
  removeFromCar(booking: bookingInfo) {
    this._sesion.removeFromShoppingList(booking).then(() => {
      this.getBookingsCar();
      this._general.showToastMessage(`La reserva ${booking.Res_cont} ha sido eliminada del carrito`, 'bottom');
    })
  }

  async pay(){
    console.log('pagando...')
    let arrBookingNum:number[]=[];
    //Suma el total de las reservas en el carrito
    this.total = this.bookingCar.reduce((acc, pilot) => acc + pilot.res_valo, 0);
    //Consulta los datos del socio logueado
    const user :user = <user>await this._sesion.GetLoggedin()
    //Por cada reserva agrega el res_cont
    for(let book of this.bookingCar ){
      arrBookingNum.push(book.Res_cont);
    }
    let emp_codi :any = <any>await this._sesion.GetClientEmpCodi();
    let _pay:payment = {sbe_codi: user.Sbe_codi,emp_codi:emp_codi,sbe_ncar:user.Sbe_ncar,valor: this.total,
     soc_mail:user.Sbe_mail, reservas:arrBookingNum}
    this._payment.CreateTransactionPayment(_pay).then((resp:transaction)=>{
        if(resp!=null){
          if(resp.Retorno==0){
            this._general.showConfirmMessage('Pasaralea de pago','Será dirigido a la pasarela de pago, una vez finalice la transacción asegúrese de presionar la X del navegador')
            .then((touch)=>{
              console.log(resp);
              this.tickeyID = resp.ObjTransaction.TicketId;
              let appBroser =  this._general.openBrowser(resp.ObjTransaction.eCollectUrl)
              appBroser.on('exit').subscribe(resp=>{
                this._payment.GetTransactionInformation(this.tickeyID).then((resp:bankTransactDone)=>{
                let modal=   this._modal.create( ConfirmPaymentPage, {'confirmation': resp} )
                    
                  

                })
              })
            })
            
          }
        }
    })
  }
 
}
