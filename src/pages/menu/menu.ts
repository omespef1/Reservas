import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BookingPage } from '../booking/booking';
import { HistoryPage } from '../history/history';
import { PqrPage } from '../pqr/pqr';
import { EventsPage } from '../events/events';
import { AgreementsPage } from '../agreements/agreements';
import { AccommodationListPage } from '../accommodation-list/accommodation-list';
import { pageApp, GnConex } from '../../class/models/models';
import { TabsPage } from '../tabs/tabs';
import {sessions} from '../../class/sessions/sessions';

/**
 * Generated class for the MenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {
  tab1Root = BookingPage;
  tab2Root = HistoryPage;
  tab3Root = PqrPage;
  tab4Root = EventsPage;
  tab5Root = AgreementsPage;
  tab6Root= AccommodationListPage;
logo:string;

  pages: pageApp [] = [
    {
    name:'Reservas',
    urlIcon:'assets/imgs/notebook.svg',
    page : BookingPage
  },
  {
    name:'Consumos',
    urlIcon:'assets/imgs/stopwatch.svg',
    page : HistoryPage
  },
  {
    name:'Pqr',
    urlIcon:'assets/imgs/questionary.svg',
    page : PqrPage
  },
  {
    name:'Eventos',
    urlIcon:'assets/imgs/calendar.svg',
    page : EventsPage
  },
  {
    name:'Convenios',
    urlIcon:'assets/imgs/handshake.svg',
    page:AgreementsPage
  },
  {
    name:'Alojamiento',
    urlIcon:'assets/imgs/hotel.svg',
    page:AccommodationListPage
  },
]
  constructor(public navCtrl: NavController, public navParams: NavParams,private _sesion:sessions) {

  }

   
   


  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuPage');
  }
  openTab(page:number){
    this.navCtrl.setRoot(TabsPage,{'tabSelected': page });
  }



}
