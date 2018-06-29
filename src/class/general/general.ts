import { AlertController, ToastController } from 'ionic-angular';
import { Injectable } from '@angular/core';



@Injectable()
export class general {
  constructor(private alert: AlertController, private toast: ToastController) {

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
      duration:3000
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
}
