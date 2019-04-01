import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { booking, room } from '../../class/models/models';
import {AccommodationDisponibilityPage} from '../accommodation-disponibility/accommodation-disponibility';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

/**
 * Generated class for the AccommodationRoomsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-accommodation-rooms',
  templateUrl: 'accommodation-rooms.html',
})

export class AccommodationRoomsPage {
  AccomodationBooking:booking = new booking();
  maxRooms= 3;
  minRooms=1;
  maxGuests=4;
  minGuests=1;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.AccomodationBooking.rooms = [];
    this.AccomodationBooking = navParams.get("accommodation");
  }

  ionViewDidLoad() {
 
  }
 //Agregar habitación
  addRoom(){
    if(this.AccomodationBooking.rooms.length<this.maxRooms){
      this.AccomodationBooking.rooms.unshift({guests:1,type:''})
    }
   
  
  }
  //Quitar habitacion
  quitRoom(){
    if(this.AccomodationBooking.rooms.length>this.minRooms)
    this.AccomodationBooking.rooms.shift();
    
  }
  //Agregar huésped a la habitación
  addGuest(room:room){
    if(room.guests<this.maxGuests)
    room.guests+=1;
  }
  //Quitar huésped a la habitación
  quitGuest(room:room){
    if(room.guests>this.minGuests)
   room.guests-=1;
  
   
  }
 valid(){
   return this.AccomodationBooking.rooms.filter(h=>h.type!='').length == this.AccomodationBooking.rooms.length;
 }

 goDisponibility(){
   this.navCtrl.push(AccommodationDisponibilityPage,{'accommodation':this.AccomodationBooking});
 }

}
