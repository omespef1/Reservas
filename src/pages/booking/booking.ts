import { IonicPage, NavController, NavParams, Refresher, ModalController } from 'ionic-angular';
import { Component } from '@angular/core';
import { timer } from 'rxjs/observable/timer';
//Providers
import { ClassSpacesProvider } from '../../providers/class-spaces/class-spaces';
import { ClassSpacesPage } from '../class-spaces/class-spaces';
import { BookingProvider } from '../../providers/booking/booking';
//clases
import { sessions } from '../../class/sessions/sessions';
import { general } from '../../class/general/general';
import { DigitalDatePipe } from '../../pipes/digital-date/digital-date';

//models

import { bookingInfo } from '../../class/models/models';
//pages
import {CarPage} from '../car/car';
import {ConfirmPaymentPage} from  '../confirm-payment/confirm-payment';
import {RunwayEventPage} from '../runway-event/runway-event';
import { SettingsPage } from '../settings/settings';
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
  showCar:boolean=false;
  bookings: any[];
  carItemsCount:number=0;
  bookingsList: any[];
  cancelValue: number[] = [];
  statesToPay = ['NO AUTORIZADO', 'EXPIRADO', 'FALLIDO'];
  constructor(public navCtrl: NavController,
    private _booking: BookingProvider,
    private session: sessions,
    private _general: general,
    private _classSpaces: ClassSpacesProvider,
    private modalCtrl: ModalController) {
  }

  ionViewWillEnter(){
   this.verifyItemsCar();
  }
  ionViewDidLoad() {


    this.session.GetLoggedin().then(resp => {
      this.user = resp;
      this.GetBooking();
      //Verificar si hay proceso de eventos pendiente
      //this.verifyPendings();
    })
  }

  GetBooking() {
    
    this._booking.GetBooking(this.user).then((resp: any) => {
      console.log(resp);
      if (resp != null) {
        this.bookings = resp.ObjTransaction;
        console.log(this.bookings);
        this.initializeItems();
      }
      else {
        this._general.showToastMessage('No tiene reservas aún!', 'bottom');
      }
    }), err => (console.log("problemas " + err));
  }

  // verifyPendings(){
  //    this.session.GetEventPending().then((resp:any)=>{
  //         if(resp!=null && resp!=undefined)
  //         this._general.showMessageOption('Proceso pendiente','Existe un proceso de creación de eventos pendiente, desea continuar?')
  //         .then(()=>{            
          
  //               this.navCtrl.push(RunwayEventPage);
            
  //         })
  //    })
  // }
  newBooking() {
    this.navCtrl.push(ClassSpacesPage);
  }
  goCar(){
    this.navCtrl.push(CarPage,{'option':'B'});
  }

  doRefresh(refresher: Refresher) {
    this._booking.GetBooking(this.user).then((resp: any) => {
      if(resp!=null){
        this.bookings = resp.ObjTransaction;
        this.initializeItems();
      }
      
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
        this.cancelValue = [];
      }).catch(() => {
        this.cancelValue[i] = 20;
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
              let cancel = { justification: resp, id: booking.Res_cont, emp_codi: this.session.GetClientEmpCodi() }
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
          }).catch(err => {
            this.cancelValue[i] = 20;
          })
        }
      })

    })
  }

 //Agrega la reserva seleccionada al carrito de compra
 async AddCart(booking: bookingInfo) {
    // let  test = this.session.verifyCarShopping(booking);
    // console.log( await test);
    try {
     await  this.session.addShoppingList(booking);    
    await  this.verifyItemsCar(); 
      this._general.showToastMessage(`La reserva  ${booking.Res_cont} ha sido agregada al carrito!`, 'bottom')
      
      
    }
    catch (err) {
      this._general.showToastMessage(`Error agregando al carrito: ${err} `, 'bottom');
    }

  }

  showDetailsPayment(booking:bookingInfo){
    let payment = {'booking':booking,'online':true}
    this.navCtrl.push(ConfirmPaymentPage,{ 'payment' : payment});
  }

  async verifyItemsCar(){    
    let list :any[] = <any[]>  await this.session.getShoppingList();
    if(list!=null && list!=undefined){
      if(list.length>0){
      this.carItemsCount = list.length
        this.showCar=true;
      }
       else{
        this.showCar=false;
       }
    }
    else{
      this.showCar=false;
    }
  
  }
  goProfile(){
    this.navCtrl.push(SettingsPage);
  }
}
