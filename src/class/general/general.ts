import { AlertController, ToastController,ActionSheetController } from 'ionic-angular';
import { Injectable } from '@angular/core';
import { BrowserTab } from '@ionic-native/browser-tab';



@Injectable()
export class general {
  constructor(private alert: AlertController, private toast: ToastController,private _browser:BrowserTab,private actionCtrl:ActionSheetController) {

  }
  ShowMessageAlert(title: string, msg: string) {
    let alertCtrl = this.alert.create({
      title: title,
      subTitle: msg,
      buttons: ['OK']
    });
    alertCtrl.present();
  }

  showMessageOption(title: string, subTitle: string) {

    let promise = new Promise((resolve, reject) => {
      let alertCtrl = this.alert.create({
        message: subTitle,
        title: title,
        buttons: [

          {
            role: 'cancel',
            text: 'Descartar'
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
  showToastMessage(msg: string, position: string) {
    let toastCtrl = this.toast.create({
      message: msg,
      position: position,
      duration: 3000,
      closeButtonText:'OK',
      showCloseButton:true
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

  showConfirmMessage(title:string,subTitle:string, data: any[] = null) {
    var promise = new Promise((resolve, reject) => {

      // if (data == null)
      //   resolve(0);
      // if (countActions.length == 1)
      //   resolve(countActions[0].ACC_CONT);
      let alert = this.alert.create();
      alert.setTitle(title);
      alert.setSubTitle(subTitle);
      if(data){
      for (let option of data ) {
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
          if(data!=undefined)
           resolve(data);
           if(data==undefined)
           reject(null);
        }
      });
      alert.present();
    })
    return promise;
  }

  openUrl(url:string){
    if(url.indexOf('http')<0 || url.indexOf('http')<0 )
      url = 'http://' + url;
        this._browser.openUrl(url)

  }
  ShowActionSheetAlert(title:string,butttons:any[]){
    let action = this.actionCtrl.create({
      title: title,
      buttons : butttons
    })
    action.present();
  }
}
