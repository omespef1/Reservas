import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActionSheetController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
/*
  Generated class for the CameraProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CameraProvider {

  constructor(private actionsheetCtrl:ActionSheetController, private camera:Camera) {
    //console.log('Hello CameraProvider Provider');
  }


  openeditprofile() {



    let promise = new Promise((resolve,reject)=>{
      let actionSheet = this.actionsheetCtrl.create({
        title: 'Option',
        cssClass: 'action-sheets-basic-page',
        buttons: [
          {
            text: 'Tomar foto',
            role: 'destructive',
            icon: 'ios-camera-outline',
            handler: () => {
              this.captureImage(false).then((photo:string)=>{
                resolve(photo);
              })
            }
          },
          {
            text: 'Galería',
            icon: 'ios-images-outline',
            handler: () => {
              this.captureImage(true).then((photo:string)=>{
                resolve(photo);
              })
            }
          },
        ]
      });
      actionSheet.present();
    })
  return promise;
  }
  async captureImage(useAlbum: boolean) {
    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      ...useAlbum ? {sourceType: this.camera.PictureSourceType.PHOTOLIBRARY} : {}
    }

    const imageData = await this.camera.getPicture(options);

   return `${imageData}`;

    // this.photos.unshift(this.base64Image);

  }
}
