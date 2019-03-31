import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
//pages
import {AccommodationSearchParamsPage } from '../accommodation-search-params/accommodation-search-params';

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AccommodationListPage');
  }

//Envía a la pantalla de selección de fecha y habitaciones
  newAccomodationBooking(){
    this.navCtrl.push(AccommodationSearchParamsPage);
  }

}
