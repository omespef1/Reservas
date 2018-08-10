import { FormsModule } from '@angular/forms';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LOCALE_ID } from '@angular/core';
//pages
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import {HistoryPage} from '../pages/history/history';
import {BookingPage} from '../pages/booking/booking';
import {SettingsPage} from '../pages/settings/settings';
import {PqrPage} from '../pages/pqr/pqr';
import {LoginPage} from '../pages/login/login';
import {ClassSpacesPage} from '../pages/class-spaces/class-spaces';
import {ProductsPage} from '../pages/products/products';
import {PartnerDetailPage} from '../pages/partner-detail/partner-detail';
import {DisponibilityPage} from '../pages/disponibility/disponibility';
import {PqrDetailPage} from '../pages/pqr-detail/pqr-detail';
import {PopOverPage} from '../pages/pop-over/pop-over';
import {ItemsPage} from '../pages/items/items';
import {NewPqrPage} from '../pages/new-pqr/new-pqr';
import {AgreementsPage} from '../pages/agreements/agreements';
import {ConfirmPage} from '../pages/confirm/confirm';
import {ThirdPartiesPage} from '../pages/third-parties/third-parties';
import {PartnerConfirmPage} from '../pages/partner-confirm/partner-confirm';
import {CompaniesPage} from '../pages/companies/companies';
import {PartnerConnectionsPage} from '../pages/partner-connections/partner-connections';
//Providers
import { ComunicationsProvider } from '../providers/comunications/comunications';
import { PartnerProvider } from '../providers/partner/partner';
import { NativeStorage } from '@ionic-native/native-storage';
import { ClassSpacesProvider } from '../providers/class-spaces/class-spaces';
import { ProductsProvider } from '../providers/products/products';
import { HistoryProvider } from '../providers/history/history';
import { PqrProvider } from '../providers/pqr/pqr';
import { BookingProvider } from '../providers/booking/booking';
import { ConnectionsProvider } from '../providers/connections/connections';
import { CompaniesProvider } from '../providers/companies/companies';
import { AgreementsProvider } from '../providers/agreements/agreements';
//Components
import {NgCalendarModule} from 'ionic2-calendar';
//clases
import {general} from '../class/general/general';
import {sessions} from '../class/sessions/sessions';


//plugins
import { BrowserTab } from '@ionic-native/browser-tab';
import * as moment from 'moment';
import { ThirdPartiesProvider } from '../providers/third-parties/third-parties';
import { KeychainTouchId } from '@ionic-native/keychain-touch-id';
//pipes
import {DigitalDatePipe } from '../pipes/digital-date/digital-date';


 @NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    HistoryPage,
    BookingPage,
    SettingsPage,
    PqrPage,
    LoginPage,
    ClassSpacesPage,
    ProductsPage,
    PartnerDetailPage,
    DisponibilityPage,
    PqrDetailPage,
    PopOverPage,
    ItemsPage,
    NewPqrPage,
    AgreementsPage,
    ConfirmPage,
    ThirdPartiesPage,
    PartnerConfirmPage,
    DigitalDatePipe,
    CompaniesPage,
    PartnerConnectionsPage
  ],
  imports: [
    FormsModule,
    BrowserModule,
    HttpModule,
    HttpClientModule,
    NgCalendarModule,
    IonicModule.forRoot(MyApp,{
      backButtonText: 'Atrás',
       monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril','Mayo','junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre' ],
    }),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    HistoryPage,
    BookingPage,
    SettingsPage,
    PqrPage,
    LoginPage,
    ClassSpacesPage,
    ProductsPage,
    PartnerDetailPage,
    DisponibilityPage,
    PqrDetailPage,
    PopOverPage,
    ItemsPage,
    NewPqrPage,
    AgreementsPage,
    ConfirmPage,
    ThirdPartiesPage,
    PartnerConfirmPage,
    CompaniesPage,
    PartnerConnectionsPage
  ],
  providers: [
  {  provide: LOCALE_ID, useValue: "es-ES" },
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ComunicationsProvider,
    PartnerProvider,
    general,
    sessions,
    ClassSpacesProvider,
    ProductsProvider,
    HistoryProvider,
    PqrProvider,
    BookingProvider,
    AgreementsProvider,
    BrowserTab,
    ThirdPartiesProvider,
    KeychainTouchId,
    DigitalDatePipe,
    ConnectionsProvider,
    CompaniesProvider
  ]
})
export class AppModule {}
