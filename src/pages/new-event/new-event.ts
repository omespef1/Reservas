import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EventDisponibilityPage } from '../event-disponibility/event-disponibility';
import {disponibilityRequestEvent}  from '../../class/models/models';
import * as moment from 'moment';
import { NgForm } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';
//pages
import {RunwayEventPage} from '../../pages/runway-event/runway-event';
/**
 * Generated class for the NewEventPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-new-event',
  templateUrl: 'new-event.html',

})
export class NewEventPage {
  myEvent: disponibilityRequestEvent = new  disponibilityRequestEvent();
  minDate:any = new Date().toISOString();
  doneText:string ="Hecho";
  cancelText:string ="Cancelar"
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewEventPage');
  }
  goDisponibility(){   
    let now = new Date();
    this.myEvent.dho_mesp = now.getMonth() +1;
    this.myEvent.dho_anop = now.getFullYear();
    console.log(this.myEvent);
    this.navCtrl.push(EventDisponibilityPage,{'myEvent': this.myEvent});
  }
  goReservas(){
    this.navCtrl.push(RunwayEventPage);
  }
  change(value){    
    console.log('entra');
    this.myEvent.esp_capa = value.length > 3 ? '' : value;
  }

}
