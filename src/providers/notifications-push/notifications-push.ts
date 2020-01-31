import { Injectable, Component } from '@angular/core';
import {  OSNotification, OSNotificationPayload } from "@ionic-native/onesignal/ngx";
import { Platform, ModalController } from 'ionic-angular';
import { NotificationsPage } from '../../pages/notifications/notifications';

/*
  Generated class for the NotificationsPushProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class NotificationsPushProvider {
  mensajes: OSNotificationPayload[] = [

  ];

  constructor(private _platform: Platform,private _modal:ModalController) {
    console.log("Hello NotificationsPushProvider Provider");
  }

  // init_notifications() {

  //   if(this._platform.is("cordova")){

    
  //   this.oneSignal.startInit(
  //     "6796a626-5bef-4c76-8148-9df8833fe6d0",
  //     "343787359895"
  //   );

  //   this.oneSignal.inFocusDisplaying(
  //     this.oneSignal.OSInFocusDisplayOption.Notification
  //   );

  //   this.oneSignal.handleNotificationReceived().subscribe(noti => {
  //     // do something when notification is received
  //     console.log("notificación recibida");
  //     this.notificacion_Recibida(noti);
  //   });

  //   this.oneSignal.handleNotificationOpened().subscribe(() => {
  //     // do something when a notification is opened
  //     console.log("notificación recibida");
  //   });

  //   this.oneSignal.endInit();
  // }
  // }

  open(noti:OSNotification){
    console.log('la notificacion es ');
    console.log(noti);
   let modal =  this._modal.create(NotificationsPage, { 'notification': noti });
   modal.present();
  }

  notificacion_Recibida(noti: OSNotification) {
    const payload = noti.payload;
    const existePush = this.mensajes.find(
      m => m.notificationID === payload.notificationID
    );
    if (existePush) return;
    this.mensajes.unshift(payload);
  }
}
