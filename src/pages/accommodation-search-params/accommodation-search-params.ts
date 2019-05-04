import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, DateTime } from 'ionic-angular';
import { NgForm } from '@angular/forms';
//pages
import {AccommodationRoomsPage} from '../accommodation-rooms/accommodation-rooms';
import { booking, user } from '../../class/models/models';
import { sessions } from '../../class/sessions/sessions';
import { general } from '../../class/general/general';
import * as moment from 'moment';

/**
 * Generated class for the AccommodationSearchParamsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-accommodation-search-params',
  templateUrl: 'accommodation-search-params.html',
})
export class AccommodationSearchParamsPage {
  doneText:string = "Hecho";
  cancelText:string="Cancelar";
  minDate: string;
  AccommodationBooking: booking= new booking();
  user:user;
  constructor(public navCtrl: NavController, public navParams: NavParams,private _sesion:sessions ,private _general:general) {


  }

  async loadInitParams(){    
    this.user = await<any> this._sesion.GetLoggedin();

    this.AccommodationBooking.Mac_nume= this.user.Mac_nume1;
    this.AccommodationBooking.Sbe_cont = this.user.Sbe_cont;
    this.AccommodationBooking.Sbe_codi = this.user.Sbe_codi;  
    this.AccommodationBooking.Soc_cont = this.user.Soc_cont; 
    // this.AccommodationBooking.Res_fini = new Date();
    // this.AccommodationBooking.Res_fina = new Date();
    this.minDate=   this._general.addDays(new Date(),1).toISOString();
   // console.log(this.minDate);

    
  }

  ionViewDidLoad() {
    this.loadInitParams();
  }
  ChooseRoms(){
    console.log(this.AccommodationBooking);
    this.navCtrl.push(AccommodationRoomsPage,{'accommodation':this.AccommodationBooking})
  }
  setMinDateOut(){
    if (this.AccommodationBooking.Res_fina ==undefined)
    this.AccommodationBooking.Res_fina = this.AccommodationBooking.Res_fini;
    if(this.AccommodationBooking.Res_fini>=  this.AccommodationBooking.Res_fina){
      // this.AccommodationBooking.Res_fina =  this.AccommodationBooking.Res_fini;
      // this.minDate = this.AccommodationBooking.Res_fina.toISOString() ;
      this.AccommodationBooking.Res_fina =  this.AccommodationBooking.Res_fini;
     // console.log(this.AccommodationBooking.Res_fina.toISOString());
    //  console.log(this.AccommodationBooking.Res_fini);
    //  this.AccommodationBooking.Res_fina = 
    //  moment(this.AccommodationBooking.Res_fini).add(1,'days').toDate();
    }
    
    
   
  }

  

 addDays(date: Date, days: number): Date {
   let newDate = date;
        newDate.setDate(newDate.getDate() + days);
        return newDate;
    }

}
