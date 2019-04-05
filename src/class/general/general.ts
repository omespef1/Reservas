import { AlertController, ToastController, ActionSheetController, Platform } from 'ionic-angular';
import { Injectable } from '@angular/core';
import { BrowserTab } from '@ionic-native/browser-tab';
import { InAppBrowser } from '@ionic-native/in-app-browser';

import * as moment from 'moment';


@Injectable()
export class general {
  constructor(private alert: AlertController, private toast: ToastController, private _browser: BrowserTab, private actionCtrl: ActionSheetController,
     private InAppBrowser: InAppBrowser, private platform: Platform) {

  }
  //Muestra una alerta con botón OK
  ShowMessageAlert(title: string, msg: string) {
    let alertCtrl = this.alert.create({
      title: title,
      subTitle: msg,
      buttons: ['OK']
    });
    alertCtrl.present();
  }
  //Muestra una alerta con una promesa que se resuelve cuando hacen click en el botón Aceptar
  ShowMessageAlertAction(title: string, msg: string): Promise<any> {
    let promise = new Promise((resolve, reject) => {
      let alertCtrl = this.alert.create({
        title: title,
        subTitle: msg,
        buttons: [
          {
            text: 'Aceptar',
            handler: () => {
              resolve();
            }
          }
        ],
        enableBackdropDismiss: false
      });
      alertCtrl.present();
    })
    return promise;

  }
//Muestra una alerta con promesa que se resuelve al dar click en aceptar, el botón descartar rechaza la promesa
  showMessageOption(title: string, subTitle: string) {

    let promise = new Promise((resolve, reject) => {
      let alertCtrl = this.alert.create({
        message: subTitle,
        title: title,
        buttons: [

          {
            role: 'cancel',
            text: 'Descartar',
            handler: data => {
              reject();
            }
          },
          {

            text: 'Si',
            handler: data => {
              resolve();
            }
          }
        ]
      })
      alertCtrl.present();
    })
    return promise;
  }
  //Convertir fecha para ios
  convertDateForIos(date: any) {
    let t = date.split(/[- :]/);
    // Apply each element to the Date function
    let d: Date = new Date(t[0], t[1] - 1, t[2], t[3], t[4], t[5]);
    var actiondate = new Date(d);
    return actiondate;
  }
  //Muestra toast con mensaje
  showToastMessage(msg: string, position: string) {
    let toastCtrl = this.toast.create({
      message: msg,
      position: position,
      duration: 4000,
      closeButtonText: 'OK',
      showCloseButton: true
    });
    toastCtrl.present();
  }
  //Muestra una alerta que incluye caja de texto
  showMessageInput(title: string, msg: string, name: string, placeHolder: string, code: string) {

    let promise = new Promise((resolve, reject) => {
      let alertCtrl = this.alert.create({
        message: msg,
        title: title,
        inputs: [
          {
            name: name,
            placeholder: placeHolder,
            type: 'number'
          }
        ],
        buttons: [
          {
            text: 'Aceptar',
            handler: data => {
              if (data != code)
                return false;
              resolve(data);
            }
          },
          {
            text: 'Cancelar',
            handler: data => {
              reject();
            }
          }
        ]
      })
      alertCtrl.present();
    });
    return promise;
  }
  //añade minutos a una fecha
  addMinutes(minutes) {
    let momentOfTime = new Date();
    let myTimeSpan = minutes * 60 * 1000;
    momentOfTime.setTime(momentOfTime.getTime() + myTimeSpan);
    return momentOfTime;
  }

  showConfirmMessage(title: string, subTitle: string, data: any[] = null) {
    var promise = new Promise((resolve, reject) => {
      let alert = this.alert.create();
      alert.setTitle(title);
      alert.setSubTitle(subTitle);
      if (data) {
        for (let option of data) {
          alert.addInput({
            type: 'radio',
            label: option.Ite_nomb,
            value: option.Ite_cont,
          });
        }
      }
      alert.addButton({
        text: 'Cancelar',
        handler: () => {

        }
      });
      alert.addButton({
        text: 'OK',
        handler: (data: any) => {
          if (data != undefined)
            resolve(data);
          if (data == undefined)
            reject(null);
        }
      });
      alert.present();
    })
    return promise;
  }

  openUrl(url: string) {
    if (url.indexOf('http') == -1 && url.indexOf('https') ==-1)        
    url = `http://${url}`;   
    this._browser.openUrl(url);
  }
  ShowActionSheetAlert(title: string, butttons: any[]) {
    let action = this.actionCtrl.create({
      title: title,
      buttons: butttons
    })
    action.present();
  }
   openMarket(packageId: string) {
     if (packageId.split("|").length > 1){
         if(this.platform.is("android"))
          packageId = packageId.split("|")[1];
          if(this.platform.is("ios"))
           packageId = packageId.split("|")[0];
       }
       else {
         packageId = packageId;
       }
  }

  openBrowser(url:string){
   let browser =  this.InAppBrowser.create(url);
     return browser;
  }

  addDays(date: Date, days: number): Date {
    date.setDate(date.getDate() + days);
    return date;
}

setTimeInDate( date : Date,hours:number,minutes:number){
  date.setHours(hours,minutes,0);
  return date;
}

  // launchExternalApp(iosSchemaName: string, androidPackageName: string, appUrl: string, httpUrl: string, username: string) {
  //   let app: string;
  //   if (this.device.platform === 'iOS') {
  //     app = iosSchemaName;
  //   } else if (this.device.platform === 'Android') {
  //     app = androidPackageName;
  //   } else {
  //     let browser = this.InAppBrowser.create(httpUrl + username, '_system');
  //     return;
  //   }
  //
  //   this.AppAvailability.check(app).then(
  //     () => { // callback exitoso
  //       let browser = this.InAppBrowser.create(appUrl + username, '_system');
  //     },
  //     () => { // callback erróneo
  //       let browser = this.InAppBrowser.create(httpUrl + username, '_system');
  //     }
  //   );
  // }

  // openInstagram(username: string) {
  //   this.launchExternalApp('instagram://', 'com.instagram.android', 'instagram://user?username=', 'https://www.instagram.com/', username);
  // }
  //
  // openTwitter(username: string) {
  //   this.launchExternalApp('twitter://', 'com.twitter.android', 'twitter://user?screen_name=', 'https://twitter.com/', username);
  // }
  //
  // openFacebook(username: string) {
  //   this.launchExternalApp('fb://', 'com.facebook.katana', 'fb://profile/', 'https://www.facebook.com/', username);
  // }
}
