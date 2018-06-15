import {AlertController,ToastController} from 'ionic-angular';
import {Injectable} from '@angular/core';


@Injectable()
export class general{
  constructor(private alert:AlertController, private toast:ToastController){

  }
  ShowMessageAlert(title:string,msg:string){
    let alertCtrl = this.alert.create({
      title:title,
      subTitle : msg,
      buttons: ['OK']
    });
    alertCtrl.present();
  }
  showToastMessage(msg:string, position:string){
    let toastCtrl= this.toast.create({
      message:msg,
      position:position
    });
    toastCtrl.present();
  }
}
