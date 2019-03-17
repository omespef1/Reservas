import { Component } from '@angular/core';

// import { AboutPage } from '../about/about';
// import { ContactPage } from '../contact/contact';
// import { HomePage } from '../home/home';
import {BookingPage} from '../booking/booking';
import {HistoryPage} from '../history/history';
import {PqrPage} from '../pqr/pqr';
import {SettingsPage} from '../settings/settings';
import {AgreementsPage} from '../agreements/agreements';
import {EventsPage} from '../events/events';
import {CarPage} from '../car/car';
import { EventsProvider } from '../../providers/events/events';
import { transaction } from '../../class/models/models';
import { of } from 'rxjs/observable/of';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = BookingPage;
  tab2Root = HistoryPage;
  tab3Root = PqrPage;
  tab4Root = EventsPage;
  tab5Root = AgreementsPage;
  tab6Root = SettingsPage;
  eventsVisible= true;


  constructor(private _events:EventsProvider) {

      this.GetConfigEvents();

  }

  GetConfigEvents(){
   this._events.GetEcEvents().then((resp:transaction)=>{
     if(resp!=null){
       if(resp.Retorno==1){
            this.eventsVisible=false;
       }
     }
   })
  }
}
