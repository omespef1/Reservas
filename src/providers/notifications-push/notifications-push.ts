import { Injectable, Component } from '@angular/core';
import { OSNotification, OSNotificationPayload, OSNotificationOpenedResult, OneSignal } from '@ionic-native/onesignal/ngx';
import { Platform, ModalController } from 'ionic-angular';
import { NotificationsPage } from '../../pages/notifications/notifications';
import { messageNotification } from '../../class/models/notifications/notifications';
import { ComunicationsProvider } from "../comunications/comunications";
import { message } from '../../interfaces/chat';
import { sessions } from '../../class/sessions/sessions';
import { ThirdPartiesPage } from '../../pages/third-parties/third-parties';

/*
  Generated class for the NotificationsPushProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class NotificationsPushProvider {
  mensajes: OSNotificationPayload[] = [

  ];
oneSignalWindow :any;
  constructor(private _modal:ModalController,private _http:ComunicationsProvider,private oneSignal:OneSignal,private _platform:Platform,private _session:sessions) {
    console.log("Hello NotificationsPushProvider Provider");
  }


  init_Notifications(){

this.oneSignalWindow=  window["plugins"].OneSignal

this.oneSignalWindow.startInit(
          "6796a626-5bef-4c76-8148-9df8833fe6d0",
          "343787359895"
        )
          .handleNotificationOpened((notificationOpenedCallback) => {
            console.log(notificationOpenedCallback);
            this.open(notificationOpenedCallback);
          })
          .endInit();

          window["plugins"].OneSignal.getIds((notificationIds)=>{
            console.log(notificationIds);
          this._session.setOneSignalIds(notificationIds);
          });   
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

  open(noti:OSNotificationOpenedResult){
    console.log('la notificacion es ');
    console.log(noti);
   let modal =  this._modal.create(NotificationsPage, { 'notification': noti.notification });
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

  sendNotifcation(message:messageNotification,playerId:string){
let players:string[]=[];
players.push(playerId);
   let notification :OSNotification={};
   notification.app_id = "6796a626-5bef-4c76-8148-9df8833fe6d0";
   notification.include_player_ids= players;
   notification.contents=  { en: message.message, es: message.message};
   notification.headings= { en: message.title, es: message.title};
  

   window["plugins"].OneSignal.postNotification(notification).then(()=>{
       console.log("notificacion enviada");
      })
  }
}
