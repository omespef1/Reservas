import { Component } from '@angular/core';

// import { AboutPage } from '../about/about';
// import { ContactPage } from '../contact/contact';
// import { HomePage } from '../home/home';
import {BookingPage} from '../booking/booking';
import {HistoryPage} from '../history/history';
import {PqrPage} from '../pqr/pqr';
import {SettingsPage} from '../settings/settings';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = BookingPage;
  tab2Root = HistoryPage;
  tab3Root = PqrPage;
  tab5Root = SettingsPage;

  constructor() {

  }
}
