import { Component, ViewChild, NgZone } from '@angular/core';
import { Platform, Events, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
//clases
import { general } from '../class/general/general';
import { sessions } from '../class/sessions/sessions';
//pages
import { LoginPage } from '../pages/login/login';
import { TabsPage } from '../pages/tabs/tabs';
import { PqrProvider } from '../providers/pqr/pqr';
import { AeEspacProvider } from '../providers/ae-espac/ae-espac';
import { transaction } from '../class/models/models';
import { MenuPage } from '../pages/menu/menu';
import { NotificationsPushProvider } from '../providers/notifications-push/notifications-push';
import { AeinappProvider } from '../providers/aeinapp/aeinapp';
import { NetworkingSearchPage } from '../pages/networking-search/networking-search';
import { NetworkingProfilePage } from '../pages/networking-profile/networking-profile';





//plugins


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav
  rootPage: any = NetworkingProfilePage;
  logged: boolean = false;
  constructor(platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    private events: Events,
    private _general: general,
    private _sessions: sessions,
    private _pqr: PqrProvider,
    private _espac: AeEspacProvider,
    private _noti:NotificationsPushProvider,
    private _aeinapp:AeinappProvider) {
    platform.ready().then(async () => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      
      statusBar.styleDefault();
      splashScreen.hide();
       // OneSignal Code start:
    // Enable to debug issues:
    // window["plugins"].OneSignal.setLogLevel({logLevel: 4, visualLevel: 4});

    var notificationOpenedCallback = function(jsonData) {
      // console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
    };
if(platform.is("cordova")){
  window["plugins"].OneSignal
  .startInit("6796a626-5bef-4c76-8148-9df8833fe6d0", "343787359895")
  .handleNotificationOpened((notificationOpenedCallback=>{
    console.log(notificationOpenedCallback);
    this._noti.open(notificationOpenedCallback);
  }))
  .endInit();
}

      this.listenToLoginEvents();

      
      // this._push.init_notifications();
      platform.registerBackButtonAction(() => {

      }, 1);

    });
  }
   listenToLoginEvents() {
    this.events.subscribe('user:logout', () => {
      this._sessions.removeSession();
      this.logged = false;
      this.nav.setRoot(LoginPage);
      this._general.showToastMessage('Su sesión se ha cerrado!', 'bottom');

    });
    //   this.events.subscribe('onBackground',()=>{
    //  //   this._backgroundMode.enable();
    //   })
    // this.events.subscribe('offBackground',()=>{
    //   //this._backgroundMode.disable();
    // })
    this.events.subscribe('user:login', (user: any) => {
      this.logged = true;
      this._sessions.setLoggedIn(user);
      this._aeinapp.SetAeInApp('I');
      this.nav.setRoot(MenuPage);
     
   
      // this._pqr.GetGnArbol(3).then((resp: any) => {
      //   if(resp!=null){
      //   this._sessions.setAmbientPqr(resp.ObjTransaction);
      //   }
      // })

          
    })


    this.events.subscribe('user:gnempre',()=>{
      
       this.LoadInitialParams();
    })
  }

 async LoadInitialParams(){
  let emp_codi = await this._sessions.getEmpCodiSession();
  this._pqr.GetPqPccapp(emp_codi).then((resp: any) => {
    
    if (resp != null) {
      this._sessions.setAmbientPqr(resp.ObjTransaction)
    }
  });
  this._pqr.GetGnItems(327).then((resp: any) => {
    if (resp != null) {
      this._sessions.setReasonsPrq(resp.ObjTransaction);
    }
  })

  this._espac.GetAeParam().then((resp: transaction) => {
    if (resp != null) {
      this._sessions.setAeParam(resp.ObjTransaction);
    }
  })
 }


  goHome() {
    this.nav.setRoot(MenuPage);
    console.log(this.nav.getActive().component.name);
  }



}
