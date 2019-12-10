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
import {CarPage} from '../pages/car/car';
import {ConfirmPaymentPage} from '../pages/confirm-payment/confirm-payment';
import {EventsPage} from '../pages/events/events';
import {NewEventPage} from '../pages/new-event/new-event';
import {EventDisponibilityPage} from  '../pages/event-disponibility/event-disponibility';
import {EventConfirmPage} from '../pages/event-confirm/event-confirm';
import{RunwayEventPage } from '../pages/runway-event/runway-event';
import {MainTemplatesPage} from '../pages/main-templates/main-templates';
import {EventProductsPage} from '../pages/event-products/event-products';
import {RunwayConfirmPage} from '../pages/runway-confirm/runway-confirm';
import {EventGntoperPage}  from '../pages/event-gntoper/event-gntoper';
import {EventCotizDetailPage  } from "../pages/event-cotiz-detail/event-cotiz-detail";
import {EventCotizProductsPage} from '../pages/event-cotiz-products/event-cotiz-products';
import {EventCotizProductsChildsPage} from '../pages/event-cotiz-products-childs/event-cotiz-products-childs';
import {AccommodationListPage } from '../pages/accommodation-list/accommodation-list';
import {AccommodationSearchParamsPage} from '../pages/accommodation-search-params/accommodation-search-params';
import{AccommodationRoomsPage } from '../pages/accommodation-rooms/accommodation-rooms';
import {AccommodationDisponibilityPage} from '../pages/accommodation-disponibility/accommodation-disponibility';
import {AccomodationConfirmationPage} from '../pages/accomodation-confirmation/accomodation-confirmation';
import { InstitutionalPage } from '../pages/institutional/institutional';
import { PartnerPaymentsPage } from '../pages/partner-payments/partner-payments';
import { PartnerPaymentsDetailsPage } from '../pages/partner-payments-details/partner-payments-details';
import { MenuPage } from '../pages/menu/menu';

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
import { PaymentProvider } from '../providers/payment/payment';
import { EventsProvider } from '../providers/events/events';
import { MainTemplatesProvider } from '../providers/main-templates/main-templates';
import { AeEspacProvider } from '../providers/ae-espac/ae-espac';
import { AccommodationConfirmationProvider } from '../providers/accommodation-confirmation/accommodation-confirmation';
import { AccommodationDisponibilityProvider } from '../providers/accommodation-disponibility/accommodation-disponibility';
import { PartnerPaymentsProvider } from '../providers/partner-payments/partner-payments';
import { AccommodationListProvider } from '../providers/accommodation-list/accommodation-list';
import { HTTP } from '@ionic-native/http';


//Components
import {NgCalendarModule} from 'ionic2-calendar';
import {AccordionComponent} from '../components/accordion/accordion';
//clases
import {general} from '../class/general/general';
import {sessions} from '../class/sessions/sessions';


//plugins
import { BrowserTab } from '@ionic-native/browser-tab';
import * as moment from 'moment';
import { ThirdPartiesProvider } from '../providers/third-parties/third-parties';
import { KeychainTouchId } from '@ionic-native/keychain-touch-id';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { OneSignal } from '@ionic-native/onesignal/ngx';
//pipes
import {DigitalDatePipe } from '../pipes/digital-date/digital-date';
import {LongDatePipe} from '../pipes/long-date/long-date';
import { NotificationsPushProvider } from '../providers/notifications-push/notifications-push';
import { NotificationsPage } from '../pages/notifications/notifications';




 



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
    LongDatePipe,
    CompaniesPage,
    PartnerConnectionsPage,
    CarPage,
    ConfirmPaymentPage,
    EventsPage,
    NewEventPage,
    AccordionComponent,
    EventDisponibilityPage,
    EventConfirmPage,
    RunwayEventPage,
    MainTemplatesPage,
    EventProductsPage,
    RunwayConfirmPage,
    EventGntoperPage,
    EventCotizDetailPage,
    EventCotizProductsPage,
    EventCotizProductsChildsPage,
    AccommodationListPage,
    AccommodationSearchParamsPage,
    AccommodationRoomsPage,
    AccommodationDisponibilityPage,
    AccomodationConfirmationPage,  
      PartnerPaymentsPage,
    PartnerPaymentsDetailsPage,
    MenuPage,
    InstitutionalPage,
    NotificationsPage
  ],
  imports: [
    FormsModule,
    BrowserModule,
    HttpModule,
    HttpClientModule,
    NgCalendarModule,
    IonicModule.forRoot(MyApp,{
      mode: 'ios',
      autocomplete: 'off',
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
    PartnerConnectionsPage,
    CarPage,
    ConfirmPaymentPage,
    EventsPage,
    NewEventPage,
    AccordionComponent,
    EventDisponibilityPage,
    EventConfirmPage,
    RunwayEventPage,
    MainTemplatesPage,
    EventProductsPage,
    RunwayConfirmPage,
    EventGntoperPage,
    EventCotizDetailPage,
    EventCotizProductsChildsPage,
    EventCotizProductsPage,
    AccommodationListPage,
    AccommodationSearchParamsPage,
    AccommodationRoomsPage,
    AccommodationDisponibilityPage,
    AccomodationConfirmationPage,
    PartnerPaymentsPage,
    PartnerPaymentsDetailsPage,
    MenuPage,
    InstitutionalPage,
    NotificationsPage
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
    LongDatePipe,
    ConnectionsProvider,
    CompaniesProvider,
    InAppBrowser,
    PaymentProvider,
    EventsProvider,
    MainTemplatesProvider,
    AeEspacProvider,
    AccommodationDisponibilityProvider,
    PartnerPaymentsProvider,
    AccommodationConfirmationProvider,
    AccommodationListProvider,
    HTTP,
    OneSignal,
    NotificationsPushProvider

  ]
})
export class AppModule {}
