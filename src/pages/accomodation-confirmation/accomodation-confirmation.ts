import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AccommodationConfirmationProvider } from '../../providers/accommodation-confirmation/accommodation-confirmation';
import { booking, transaction, ToUpdatetMultiBooking, user, bookingInfo } from '../../class/models/models';
import * as moment from 'moment';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { general } from '../../class/general/general';
import { AccommodationListPage } from '../accommodation-list/accommodation-list';
import { AccommodationListProvider } from '../../providers/accommodation-list/accommodation-list';
import { sessions } from '../../class/sessions/sessions';
import { CarPage } from '../car/car';


/**
 * Generated class for the AccomodationConfirmationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-accomodation-confirmation',
  templateUrl: 'accomodation-confirmation.html',
})
export class AccomodationConfirmationPage {


  totalApp: number = 0;
  total: number = 0;
  subTotal: number = 0;
  totalImpuestos = 0;
  user:user;

  AccommodationBooking: booking;
  objUpdateBookings: ToUpdatetMultiBooking= {Ids:[],emp_codi:0};
  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    private _provider: AccommodationConfirmationProvider,
     private _general: general,
     private _accomodationListProvider:AccommodationListProvider,
     private _sesion:sessions) {
    this.AccommodationBooking = this.navParams.get('accomodation');
  }



  async ionViewDidLoad() {
    this.GetValueSpaces();
    this.user = <any> await this._sesion.GetLoggedin();
  }

  GetValueSpaces() {
    this._provider.GetValuesSpaces(this.AccommodationBooking).then((resp: transaction) => {
      if (resp != null) {
       
        this.AccommodationBooking.AccomodationSpaces = resp.ObjTransaction;
        //Calcula el total de todos los espacios reservados
        this.total = this.AccommodationBooking.AccomodationSpaces.reduce((acc, pilot) => acc + pilot.liquidation.valorTotal, 0);
        //Calcula el total de la liquidación proveída por Seven, es decir este es el total real con impuestos
        
        //Calcula el subtotal de todos los espacios reservados
        this.subTotal = this.AccommodationBooking.AccomodationSpaces.reduce((acc, pilot) => acc + pilot.liquidation.subTotal, 0);
        //Calcula el total de impuestos de todos los espacios reservados
        this.totalImpuestos = this.AccommodationBooking.AccomodationSpaces.reduce((acc, pilot) => acc + pilot.liquidation.totalImpuestos, 0);
        //Calcula el total como lo calcula el api sin liquidación de seven
        this.totalApp = this.AccommodationBooking.AccomodationSpaces.reduce((acc, pilot) => acc + pilot.priceSpace, 0);
        //Crea el objeto que contendrá todos los RES_CONT de las reservas que se generaron en estado pendiente}
     debugger;
        let arrIds: any[]=[];
        for (let spaceBooking of this.AccommodationBooking.AccomodationSpaces) {
          arrIds.push(spaceBooking.res_cont);
        }
        this.objUpdateBookings.Ids = arrIds;
      }
    })
  }
//Función para calcula diferencia de días entre 2 fechas
  GetDifferenceInDays(): number {
    let start = moment(this.AccommodationBooking.Res_fini, "YYYY-MM-DD");
    let end = moment(this.AccommodationBooking.Res_fina, "YYYY-MM-DD");

    //Difference in number of days
    return moment.duration(end.diff(start)).asDays();

  }


  //Cambia el estado de las reservas desde Pendiente a reservado
 async makeReservations() {
    await this._provider.updateBookingStates(this.objUpdateBookings)
    await this.GetBooking();
    this.navCtrl.setRoot(CarPage);
     // if (resp != null) {
        // this._general.ShowMessageAlert('Listo!', 'Se han creado las reserva con éxito');
        // this.navCtrl.setRoot(AccommodationListPage);
      
    //  }
 
  }

   async GetBooking() {
    await  this._sesion.removeCar();
     let transactions:bookingInfo []= [];
      let resp:transaction = <any> await this._accomodationListProvider.GetBooking(this.user);
     
      if (resp != null) {
       transactions = resp.ObjTransaction;
      for(let booking of transactions){     
     
          if(this.objUpdateBookings.Ids.filter(b=>b == booking.Res_cont).length>0){
           await  this._sesion.addShoppingList(booking);
          
          }
      }           
      }    
   }

}
