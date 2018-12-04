import { AlertController, ToastController, ActionSheetController, Platform } from 'ionic-angular';
import { Injectable } from '@angular/core';
import { BrowserTab } from '@ionic-native/browser-tab';
import { InAppBrowser } from '@ionic-native/in-app-browser';




@Injectable()
export class general {
  constructor(private alert: AlertController, private toast: ToastController, private _browser: BrowserTab, private actionCtrl: ActionSheetController,
     private InAppBrowser: InAppBrowser, private platform: Platform) {

  }
  ShowMessageAlert(title: string, msg: string) {
    let alertCtrl = this.alert.create({
      title: title,
      subTitle: msg,
      buttons: ['OK']
    });
    alertCtrl.present();
  }
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
  convertDateForIos(date: any) {
    let t = date.split(/[- :]/);
    // Apply each element to the Date function
    let d: Date = new Date(t[0], t[1] - 1, t[2], t[3], t[4], t[5]);
    var actiondate = new Date(d);
    return actiondate;
  }
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
    if (url.indexOf('http') > -1 || url.indexOf('https') > -1) {
      if (url.split("|").length > 1){
          if(this.platform.is("android"))
           url = url.split("|")[1];
           if(this.platform.is("ios"))
            url = url.split("|")[0];
        }
      //Si los links tienen http o https son páginas web
      console.log(url);
      this._browser.openUrl(url);
      
    }
    // else {
    //   ///Si los links no tiene http o https son apps
    //   this.openMarket(url);
    // }






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
