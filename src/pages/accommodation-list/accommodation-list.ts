import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Refresher } from 'ionic-angular';
//pages
import {AccommodationSearchParamsPage } from '../accommodation-search-params/accommodation-search-params';
import { AccommodationListProvider } from '../../providers/accommodation-list/accommodation-list';
import { sessions } from '../../class/sessions/sessions';
import { general } from '../../class/general/general';
import { CarPage } from '../car/car';
import { ClassSpacesProvider } from '../../providers/class-spaces/class-spaces';
import { bookingInfo } from '../../class/models/models';
import { ConfirmPaymentPage } from '../confirm-payment/confirm-payment';
import { BookingProvider } from '../../providers/booking/booking';

/**
 * Generated class for the AccommodationListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-accommodation-list',
  templateUrl: 'accommodation-list.html',
})
export class AccommodationListPage {
  user: any;
  showCar:boolean=false;
  bookings: any[];
  carItemsCount:number=0;
  bookingsList: any[];
  cancelValue: number[] = [];
  statesToPay = ['NO AUTORIZADO', 'EXPIRADO', 'FALLIDO'];
  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     private _provider:AccommodationListProvider,
     private session:sessions,
     private _general:general,
     private _class:ClassSpacesProvider,
     private _bookingp:BookingProvider
     ) {
  }



//Envía a la pantalla de selección de fecha y habitaciones
  newAccomodationBooking(){
    this.navCtrl.push(AccommodationSearchParamsPage);
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
     
     this._provider.GetBooking(this.user).then((resp: any) => {
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
 

   goCar(){
     this.navCtrl.push(CarPage);
   }
 
   doRefresh(refresher: Refresher) {
     this._provider.GetBooking(this.user).then((resp: any) => {
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
     this._class.GetClassSpace(booking).then((resp: any) => {
       let fechaInicio = new Date(resp.FechaInicio);
       let fechaInicioPosible = this._general.addMinutes(resp.Cla_Tica);
       if (fechaInicioPosible > fechaInicio) {
         this._general.showToastMessage(`El plazo para cancelar la reserva  (${resp.Cla_Tica}) minuto(s) ha vencido.`, 'bottom')
         return;
       }
       //Se obtienen los items para llenar los motivos de rechazo
       this._bookingp.GetGnItems().then((resp: any) => {
         if (resp != null) {
           let items = resp.ObjTransaction;
           this._general.showConfirmMessage('Está seguro de que desea cancelar esta reserva?', 'Seleccione el motivo', items).then(resp => {
             if (resp != null && resp != 0) {
               let cancel = { justification: resp, id: booking.Res_cont, emp_codi: this.session.GetClientEmpCodi() }
               //Se cancela la reserva según el motivo de selección del usuario
               this._bookingp.cancelBooking(cancel).then((resp: any) => {
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

}
