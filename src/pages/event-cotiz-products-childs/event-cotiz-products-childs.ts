import { Component, ViewChild, Renderer } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {  EcDespa } from '../../class/models/models';

/**
 * Generated class for the EventCotizProductsChildsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-event-cotiz-products-childs',
  templateUrl: 'event-cotiz-products-childs.html',
})
export class EventCotizProductsChildsPage {
espacio:EcDespa;


  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.espacio = navParams.get("espacio");
  }

  ionViewDidLoad() {
    
  }

}
