import { Component,ViewChild } from '@angular/core';
import { Platform ,Events,Nav} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
//clases
import {general} from '../class/general/general';
import {sessions} from '../class/sessions/sessions';
//pages
import { LoginPage } from '../pages/login/login';
import {TabsPage} from '../pages/tabs/tabs';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
   @ViewChild(Nav) nav: Nav
  rootPage:any = LoginPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,private events: Events,private _general:general,private _sessions:sessions) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      this.listenToLoginEvents();
    });
  }
  listenToLoginEvents() {
  this.events.subscribe('user:logout', () => {
    this._sessions.removeSession();
  this.nav.setRoot(LoginPage);
  this._general.showToastMessage('Su sesión se ha cerrado!','bottom');

  });
  this.events.subscribe('user:login',(user:any)=>{
    console.log(user);
      this._sessions.setLoggedIn(user);
      this.nav.setRoot(TabsPage);
  })
}

}
