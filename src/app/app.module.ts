import { FormsModule } from '@angular/forms';
import { MbscModule } from '@mobiscroll/angular';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
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
import { IonicStorageModule } from '@ionic/storage';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
//Providers
import { ComunicationsProvider } from '../providers/comunications/comunications';
import { PartnerProvider } from '../providers/partner/partner';
import { NativeStorage } from '@ionic-native/native-storage';

//Components
import {ExpandableComponent} from '../components/expandable/expandable';

//clases

import {general} from '../class/general/general';
import {sessions} from '../class/sessions/sessions';
import { ClassSpacesProvider } from '../providers/class-spaces/class-spaces';
import { ProductsProvider } from '../providers/products/products';
import { HistoryProvider } from '../providers/history/history';
import { PqrProvider } from '../providers/pqr/pqr';
import { RegisterProvider } from '../providers/register/register';
import { BookingProvider } from '../providers/booking/booking';

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
    ExpandableComponent
  ],
  imports: [
    FormsModule,
    MbscModule,
    BrowserModule,
    HttpModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
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
    ExpandableComponent
  ],
  providers: [
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
    RegisterProvider,
    BookingProvider
  ]
})
export class AppModule {}
