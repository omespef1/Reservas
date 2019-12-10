import { Component, ViewChild, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides } from 'ionic-angular';
import { BookingPage } from '../booking/booking';
import { HistoryPage } from '../history/history';
import { PqrPage } from '../pqr/pqr';
import { EventsPage } from '../events/events';
import { AgreementsPage } from '../agreements/agreements';
import { AccommodationListPage } from '../accommodation-list/accommodation-list';
import { pageApp, GnConex } from '../../class/models/models';
import { TabsPage } from '../tabs/tabs';
import {sessions} from '../../class/sessions/sessions';
import { SettingsPage } from '../settings/settings';
import { InstitutionalPage } from '../institutional/institutional';
import { AgreementsProvider } from "../../providers/agreements/agreements";
import { transaction, agreement } from '../../class/Models/models';

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
export class MenuPage implements OnInit {
  tab1Root = BookingPage;
  tab2Root = HistoryPage;
  tab3Root = PqrPage;
  tab4Root = EventsPage;
  tab5Root = AgreementsPage;
  tab6Root= AccommodationListPage;
  loadingBanner=false;
logo:string;
banners:agreement[]=[];

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
    name:'Servicios',
    urlIcon:'assets/imgs/handshake.svg',
    page:AgreementsPage
  },
  {
    name:'Alojamiento',
    urlIcon:'assets/imgs/hotel.svg',
    page:AccommodationListPage
  },
  {
    name:'Institucional',
    urlIcon:'assets/imgs/hotel.svg',
    page:InstitutionalPage
  },
]
  constructor(public navCtrl: NavController, public navParams: NavParams,private _sesion:sessions,private _agrrements:AgreementsProvider) {

  }    
  
  ngOnInit(): void {
    this.GetBanners();
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    
  }
  ionViewDidLoad() {
   
  
  }
  openTab(page:number){
    this.navCtrl.setRoot(TabsPage,{'tabSelected': page });
  }
  goProfile(){
    this.navCtrl.push(SettingsPage);
  }
  GetBanners(){
    this.loadingBanner=true;
    this._agrrements.GetBanners().then((resp:transaction)=>{
      this.loadingBanner=false;
      if(resp.Retorno==0){
        console.log(resp);
        this.banners = resp.ObjTransaction;
      }
    })
  }


}
