import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
//Providers
import {ClassSpacesProvider} from '../../providers/class-spaces/class-spaces';
import {ClassSpacesPage} from '../class-spaces/class-spaces';
import {BookingProvider} from '../../providers/booking/booking';
//clases
import {sessions} from '../../class/sessions/sessions';

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
  user:any;
  bookings:any[];
  constructor(public navCtrl: NavController, private _booking:BookingProvider,private session:sessions) {

  }

  ionViewDidLoad() {
    this.session.GetLoggedin().then((resp:any)=>{
      console.log(resp);
        this.user = resp;
          this.GetBooking();
    })
    console.log('ionViewDidLoad BookingPage');

  }

  GetBooking(){
      this._booking.GetBooking(this.user).then((resp:any)=>{
         if(resp.ObjTransaction!=null){
           this.bookings = resp.ObjTransaction;
         }
      })
  }
newBooking(){
  this.navCtrl.push(ClassSpacesPage);
}
expandItem(item){

       this.bookings.map((listItem) => {
           if(item == listItem){
               listItem.expanded = !listItem.expanded;
           } else {
               listItem.expanded = false;
           }
           return listItem;
       });
   }
}
