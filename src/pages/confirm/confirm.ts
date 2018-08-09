import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { disponibilityRequest } from '../../class/models/models';
import * as moment from 'moment';
//providers
import { BookingProvider } from '../../providers/booking/booking';
//Clases
import { sessions } from '../../class/sessions/sessions';
import { user,Ifactory } from '../../class/models/models';
import {general} from '../../class/general/general';
//pages
import {BookingPage} from '../../pages/booking/booking';
//pipes
import{DigitalDatePipe} from '../../pipes/digital-date/digital-date';

/**
 * Generated class for the ConfirmPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-confirm',
  templateUrl: 'confirm.html',
})
export class ConfirmPage {
  startTime: string;
  endTime: string;
  today: Date = new Date();
  user: user;
  booking: Ifactory;
  constructor(public navParams: NavParams, private _booking: BookingProvider, private _sesion: sessions,private _general:general, private _nav:NavController) {
    this.booking = navParams.get('booking');
    console.log(this.booking);
    console.log(this.booking);
    this._sesion.GetLoggedin().then((user: user) => {
      this.user = user;
    })

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConfirmPage');
  }
  SetBooking() {
    // this._general.showMessageOption('Está seguro de realizar esta reserva?','').then(()=>{
    //   this.SetBooking();
    // })
    console.log(this.booking);
   if(this.booking.thirdPartie==null)
   this.booking.thirdPartie = {
     Ter_codi:0
   }
    let newBooking: any = {
      Emp_codi: 1,
      Res_fini: new Date(this.booking.agend.age_Fini),
      Res_fina: new Date(this.booking.agend.age_Fina),
      Soc_cont: this.user.Soc_cont,
      Mac_nume: this.user.Mac_nume1,
      Sbe_cont: this.user.Sbe_cont,
      Esp_cont: this.booking.agend.esp_cont,
      Res_numd: 0,
      Ite_cont: 10207,
      Ter_codi: this.booking.thirdPartie.Ter_codi,
      Res_tdoc: 0,
      Res_dinv: 0,
      Res_ninv: "",
      Res_inac: "",
      Cla_cont: this.booking.class.Cla_cont,
      Esp_mdit: this.booking.product.esp_mdit,
      Productos: [
        {
          Pro_cont: this.booking.product.Pro_cont,
          Dpr_valo:0,
          Dpr_dura:  this.booking.product.Pro_dmin

        }
      ]

    }
     this._booking.SetBooking(newBooking).then((resp:any)=>{
       console.log(resp);
          if(resp.InvoiceId==0){
            this._general.ShowMessageAlert('Reserva no realizada', `${resp.TxtError}`);
            return;
          }
            this._general.ShowMessageAlert('Reserva realizada!', `Se ha creado la reserva número ${resp.InvoiceId}, puede ver los detalles o cancelarla en la sección mis reservas.`);
            this._nav.setRoot(BookingPage);
     })
  }

}
