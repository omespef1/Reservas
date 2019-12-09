
import { Injectable } from '@angular/core';
import { OneSignal } from '@ionic-native/onesignal/ngx';
import { Platform } from 'ionic-angular';


/*
  Generated class for the NotificationsPushProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class NotificationsPushProvider {

  constructor(private oneSignal:OneSignal,private _platform:Platform) {
    console.log('Hello NotificationsPushProvider Provider');
  }

  init_notifications(){
    this.oneSignal.startInit('6796a626-5bef-4c76-8148-9df8833fe6d0', '343787359895');

this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);

this.oneSignal.handleNotificationReceived().subscribe(() => {
 // do something when notification is received
 console.log('notificación recibida')
});

this.oneSignal.handleNotificationOpened().subscribe(() => {
  // do something when a notification is opened
  console.log('notificación recibida')
});

this.oneSignal.endInit();
  }

}
