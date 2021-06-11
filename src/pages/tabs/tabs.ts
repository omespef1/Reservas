import { Component, ViewChild } from '@angular/core';

// import { AboutPage } from '../about/about';
// import { ContactPage } from '../contact/contact';
// import { HomePage } from '../home/home';
import {BookingPage} from '../booking/booking';
import {HistoryPage} from '../history/history';
import {PqrPage} from '../pqr/pqr';
import { SettingsPage } from '../settings/settings';
import {AgreementsPage} from '../agreements/agreements';
import {EventsPage} from '../events/events';
import {AccommodationListPage} from '../accommodation-list/accommodation-list';
import {CarPage} from '../car/car';
import { EventsProvider } from '../../providers/events/events';
import { transaction } from '../../class/models/models';
import { of } from 'rxjs/observable/of';
import { NavParams, Tabs } from 'ionic-angular';
import { InstitutionalPage } from '../institutional/institutional';
import { BookingInvitedsPage } from '../booking-inviteds/booking-inviteds';
import { NetworkingMenuPage } from '../networking-menu/networking-menu';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {



  tab1Root = BookingPage;
  tab2Root = HistoryPage;
  tab3Root = PqrPage;
  tab4Root = EventsPage;
  tab5Root = AgreementsPage;
  tab6Root= AccommodationListPage;
  tab7Root= InstitutionalPage;
  tab8Root = BookingInvitedsPage;
  // tab9Root=NetworkingMenuPage;
  tab10Root=SettingsPage;
  // tab7Root = SettingsPage;
  indexTab:number;
  @ViewChild('myTabs') tabRef: Tabs;

 

  constructor(private _events:EventsProvider,private _nav:NavParams) {
   this.indexTab = this._nav.get('tabSelected');
  }
  ionViewDidLoad(){
  
  }
  ionViewDidEnter(){
    this.tabRef.select(this.indexTab);
  }


}
