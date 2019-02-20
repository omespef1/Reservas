import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
//models
import {booking,disponibilityRequestEvent, transaction} from '../../class/Models/models';
//providers
import {BookingProvider} from '../../providers/booking/booking';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import * as moment from 'moment';
import { stringify } from '@angular/core/src/util';
import {general} from '../../class/general/general';

/**
 * Generated class for the EventConfirmPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-event-confirm',
  templateUrl: 'event-confirm.html',
})
export class EventConfirmPage {

   MyEventBooking :  booking = new booking();
   mySelectedEvent: disponibilityRequestEvent;
   price:string;
   
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private _booking:BookingProvider,
    private _general:general) {
    this.mySelectedEvent = navParams.get("event");
    this.MyEventBooking = navParams.get("myBooking");
    console.log(this.MyEventBooking);
  }

  ionViewDidLoad() {
 this.GetProduct();
  }


  async GetProduct(){

     let producto:transaction = <any> await  this._booking.GetProductBooking(this.MyEventBooking.Esp_cont,this.MyEventBooking.Res_fini.toString(),this.MyEventBooking.Res_fina.toString());
     if(producto!=null && producto.ObjTransaction!=null){
        this.price = producto.ObjTransaction.Dpr_valo;
     }
  }

  MakeBooking(){
    this.MyEventBooking.cotizacionExpress=true;
    console.log(this.MyEventBooking.Res_fina);
    this._booking.SetBooking(this.MyEventBooking).then((resp:any)=>{
      console.log(resp);
      if(resp!=null){
         if(resp.InvoiceId==0){
           this._general.ShowMessageAlert('Reserva no realizada', `${resp.TxtError}`);
           return;
         }
           this._general.ShowMessageAlert('Reserva realizada!', `Se ha creado la reserva número ${resp.InvoiceId}, puede ver los detalles o cancelarla en la sección mis reservas.`);
          
         }
    })
  }
}
