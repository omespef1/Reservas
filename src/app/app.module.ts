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
import {EventGntoperPage}  from '../pages/event-gntoper/event-gntoper';
import {EventCotizDetailPage  } from "../pages/event-cotiz-detail/event-cotiz-detail";
import {EventCotizProductsPage} from '../pages/event-cotiz-products/event-cotiz-products';
import {EventCotizProductsChildsPage} from '../pages/event-cotiz-products-childs/event-cotiz-products-childs';
import {AccommodationListPage } from '../pages/accommodation-list/accommodation-list';
import {AccommodationSearchParamsPage} from '../pages/accommodation-search-params/accommodation-search-params';
import { BookingInvitedsPage } from '../pages/booking-inviteds/booking-inviteds';
import { BookingNewInvitedPage } from '../pages/booking-new-invited/booking-new-invited';
import { HistoryDetailPage } from '../pages/history-detail/history-detail';
import{AccommodationRoomsPage } from '../pages/accommodation-rooms/accommodation-rooms';
import {AccommodationDisponibilityPage} from '../pages/accommodation-disponibility/accommodation-disponibility';
import {AccomodationConfirmationPage} from '../pages/accomodation-confirmation/accomodation-confirmation';
import { InstitutionalPage } from '../pages/institutional/institutional';
import { PartnerPaymentsPage } from '../pages/partner-payments/partner-payments';
import { PartnerPaymentsDetailsPage } from '../pages/partner-payments-details/partner-payments-details';
import { MenuPage } from '../pages/menu/menu';
import { NetworkingTermsPage } from '../pages/networking-terms/networking-terms';
import { NetworkingMenuPage } from '../pages/networking-menu/networking-menu';
import { NetworkingSearchPage } from '../pages/networking-search/networking-search';
import { NetworkingNewsViewerPage } from '../pages/networking-news-viewer/networking-news-viewer';
import { NetworkingProfileProyectPage } from '../pages/networking-profile-proyect/networking-profile-proyect';
import { NotificationsPage } from '../pages/notifications/notifications';
import { NetworkingNewsPage } from '../pages/networking-news/networking-news';
import { NetworkingEditTextPage } from '../pages/networking-edit-text/networking-edit-text';
import { NetworkingProfilePage } from '../pages/networking-profile/networking-profile';
import { NetworkingMessagesPage } from '../pages/networking-messages/networking-messages';
import { NetworkingClassifiedsPage } from '../pages/networking-classifieds/networking-classifieds';
import { NetworkingClassifiedsTermsPage } from '../pages/networking-classifieds-terms/networking-classifieds-terms';
import { NetworkingClassifiedsNewPage } from '../pages/networking-classifieds-new/networking-classifieds-new';
import { NetworkingFavoritesPage } from '../pages/networking-favorites/networking-favorites';
import { NetworkingBusinessAreaPage } from '../pages/networking-business-area/networking-business-area';





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
import { ThirdPartiesProvider } from '../providers/third-parties/third-parties';
import { HTTP } from '@ionic-native/http';
import { SoclanwProvider } from '../providers/soclanw/soclanw';
import { AeosappProvider } from '../providers/aeosapp/aeosapp';
import { SofanetProvider } from '../providers/sofanet/sofanet';


//Components
import {NgCalendarModule} from 'ionic2-calendar';
import {AccordionComponent} from '../components/accordion/accordion';
import { SkeletonItemComponent } from '../components/skeleton-item/skeleton-item';
//clases
import {general} from '../class/general/general';
import {sessions} from '../class/sessions/sessions';


//plugins
import { BrowserTab } from '@ionic-native/browser-tab';
import * as moment from 'moment';

import { KeychainTouchId } from '@ionic-native/keychain-touch-id';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { OneSignal } from '@ionic-native/onesignal/ngx';
//pipes
import {DigitalDatePipe } from '../pipes/digital-date/digital-date';
import {LongDatePipe} from '../pipes/long-date/long-date';
import { NotificationsPushProvider } from '../providers/notifications-push/notifications-push';

import { InvitedProvider } from '../providers/invited/invited';

import { AeinappProvider } from '../providers/aeinapp/aeinapp';
import { SopernwProvider } from '../providers/sopernw/sopernw';


import { EerevetProvider } from '../providers/eerevet/eerevet';
import { SodpernProvider } from '../providers/sodpern/sodpern';
import { NetworkingChatPage } from "../pages/networking-chat/networking-chat";

import { AngularFireModule } from 'angularfire2';


import { firebaseConfig } from '../environment';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';


 



 @NgModule({
  declarations: [
    MyApp,
    AboutPage,
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
    NotificationsPage,
    BookingInvitedsPage,
    BookingNewInvitedPage,
    HistoryDetailPage,
    SkeletonItemComponent,
    NetworkingTermsPage,
    NetworkingMenuPage,
    NetworkingSearchPage,
    NetworkingProfilePage,
    NetworkingMessagesPage,
    NetworkingClassifiedsPage,
    NetworkingClassifiedsTermsPage,
    NetworkingEditTextPage,
    NetworkingClassifiedsNewPage,
    NetworkingNewsPage,
    NetworkingNewsViewerPage,
    NetworkingProfileProyectPage,
    NetworkingFavoritesPage,
    NetworkingBusinessAreaPage,
    NetworkingChatPage
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
 //   AngularFireModule.initializeApp(firebaseConfig),
   
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
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
    NotificationsPage,
    BookingInvitedsPage,
    BookingNewInvitedPage,
    HistoryDetailPage,
    SkeletonItemComponent,
    NetworkingTermsPage,
    NetworkingMenuPage,
    NetworkingSearchPage,
    NetworkingProfilePage,
    NetworkingMessagesPage,
    NetworkingClassifiedsPage,
    NetworkingClassifiedsTermsPage,
    NetworkingEditTextPage,
    NetworkingClassifiedsNewPage,
    NetworkingNewsPage,
    NetworkingNewsViewerPage,
    NetworkingProfileProyectPage,
    NetworkingFavoritesPage,
    NetworkingBusinessAreaPage,
    NetworkingChatPage
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
    NotificationsPushProvider,
    InvitedProvider,
    AeinappProvider,
    SopernwProvider,
    SoclanwProvider,
    AeosappProvider,
    SofanetProvider,
    EerevetProvider,
    EerevetProvider,
    SodpernProvider

  ]
})
export class AppModule {}
