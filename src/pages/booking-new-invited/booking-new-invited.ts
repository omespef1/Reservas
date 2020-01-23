import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { InvitedProvider } from '../../providers/invited/invited';
import { invited, user, transaction } from '../../class/Models/models';
import { sessions } from "../../class/sessions/sessions";
import { general } from '../../class/general/general';
import { BookingInvitedsPage } from '../booking-inviteds/booking-inviteds';
import * as moment from 'moment';


/**
 * Generated class for the BookingNewInvitedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-booking-new-invited',
  templateUrl: 'booking-new-invited.html',
})
export class BookingNewInvitedPage {
  invited:invited = new invited();
  user:user= new user();
  now:string;
  constructor(public navCtrl: NavController, public navParams: NavParams,private _service:InvitedProvider,private _sesion:sessions,private _general:general) {
    _sesion.GetLoggedin().then((user:user)=>{
      console.log(user);
      this.user = user;
      this.now = new Date().toISOString();
    })
  }

  ionViewDidLoad() {
   
  }

  SetInvited(){

    let invitedDatecomplete = new Date();
   
    this.invited.Sbe_codi = this.user.Sbe_codi;
    this.invited.Emp_codi = this._sesion.GetClientEmpCodi();
    this.invited.Soc_cont = this.user.Soc_cont;
    this.invited.Sbe_Cont = this.user.Sbe_cont;
    this.invited.Mac_nume = this.user.Mac_nume1;

    // new Date(moment(disp.FechaInicio).toISOString()),
    // let year:number =Number(this.invitedDate.toString().split('-')[0]);
    // let Month:number =Number(this.invitedDate.toString().split('-')[1]);
    // let days:number =Number(this.invitedDate.toString().split('-')[2]);
    // let hours:number = Number(this.hourInvitedDate.toString().split(':')[0]);
    // let minutes:number = Number(this.hourInvitedDate.toString().split(':')[1]);

  
    //this.invitedDate.setHours(hours,minutes);
    // this.invited.Fecha = new Date(year,Month,days,hours,minutes).toLocaleDateString();
    // console.log(this.invited.Fecha);
    this._service.SetInvited(this.invited).then((resp:transaction)=>{
      console.log(resp);
      if(resp!=undefined && resp.Retorno==0){
        
        this._general.showToastMessage(`Has invitado a ${this.invited.Nombre} ${this.invited.Apellido}!`,'bottom');
        this.navCtrl.setRoot(BookingInvitedsPage);
      }
    })
  }

}
