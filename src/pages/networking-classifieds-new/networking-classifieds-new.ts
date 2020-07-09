import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ViewController,
} from "ionic-angular";
import { general } from "../../class/general/general";
import { SoclanwProvider } from "../../providers/soclanw/soclanw";
import { soclanw } from "../../class/models/soclanw/soclanw";
import { transaction, user, transactionNumber } from "../../class/models/models";
import { sessions } from "../../class/sessions/sessions";
import { ActionSheetController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';


/**
 * Generated class for the NetworkingClassifiedsNewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-networking-classifieds-new",
  templateUrl: "networking-classifieds-new.html",
})
export class NetworkingClassifiedsNewPage {
  sending = false;
  termsreceived = "";
  user: user = new user();
  classified: soclanw = new soclanw();
  editMode=false;
  file: File;
  base64Image:string="";
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private _general: general,
    private _soclanw: SoclanwProvider,
    private _sesion: sessions,
    private _view: ViewController,
    private actionsheetCtrl:ActionSheetController,
    private camera:Camera
  ) {
    this._sesion.GetLoggedin().then((resp: user) => {
      this.user = resp;
    });
  }

  ionViewDidLoad() {
    if(this.navParams.get('editClassified'))
    this.editMode=true;
    if(!this.editMode){
      this.classified = new soclanw();
      this.load();
    }
  
    else {
      this.classified = this.navParams.get('editClassified')
    }
  }

load(){
  this._sesion.GetLoggedin().then((resp:user)=>{
  this.classified.cla_nomb = `${resp.Soc_nomb} ${resp.Soc_apel}`;
  this.classified.cla_tele = Number(resp.Soc_tele);
  })
}
  Ok(){
    if(!this.editMode)
    this.SetClassified();
    else
    this.updateClassified();

  }

  SetClassified() {
    
    this.sending = true;
 
    this.classified.emp_codi = this._sesion.GetClientEmpCodi();
    this.classified.mac_nume = this.user.Mac_nume1;
    this.classified.soc_cont = this.user.Soc_cont;
    this.classified.sbe_cont = this.user.Sbe_cont;      
    this._soclanw.SetSoClanw(this.classified).then((resp: transactionNumber) => {
      this.sending = false;

      if (resp != null && resp.Retorno == 0) {
        // if(this.file!=undefined){
        //   this._soclanw.uploadPhoto(this.file,this._sesion.GetClientEmpCodi(),resp.number).subscribe(resp=>{
        //     console.log(resp);
        //   })
        // }
      
        this._general.showCustomAlert(
          "¡Hemos recibido la solicitud de su clasificado!",
          this._sesion.getAeParam().par_rsdc == undefined
            ? "Mensaje sin definir"
            : this._sesion.getAeParam().par_rsdc,
          (resp) => {
            this._view.dismiss();
          },
          "alert-nogal",
          false,
          "Recuerde que los avisos se publicarán el día viernes de cada semana."
        );
      }
    });
  }
  updateClassified(){
    console.log(this.classified);
    this.sending=true;        
    this._soclanw.UpdateSoClanw(this.classified).then((resp: transaction) => {
      this.sending = false;
      if (resp != null && resp.Retorno == 0) {
        this._general.showCustomAlert(
          "¡Hemos recibido la solicitud de su clasificado!",
          this._sesion.getAeParam().par_rsdc == undefined
            ? "Mensaje sin definir"
            : this._sesion.getAeParam().par_rsdc,
          (resp) => {
            this._view.dismiss();
          },
          "alert-nogal",
          false,
          "Recuerde que los avisos se publicarán el día viernes de cada semana."
        );
      }
    });
    

  }



  closeModal() {
    this._view.dismiss();
  }

  changeListener($event){
    this.file = $event.target.files[0];
    console.log(this.file);
  }

  openeditprofile() {
    let actionSheet = this.actionsheetCtrl.create({
      title: 'Option',
      cssClass: 'action-sheets-basic-page',
      buttons: [
        {
          text: 'Tomar foto',
          role: 'destructive',
          icon: 'ios-camera-outline',
          handler: () => {
            this.captureImage(false);
          }
        },
        {
          text: 'Galería',
          icon: 'ios-images-outline',
          handler: () => {
            this.captureImage(true);
          }
        },
      ]
    });
    actionSheet.present();
  }

  async captureImage(useAlbum: boolean) {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      ...useAlbum ? {sourceType: this.camera.PictureSourceType.PHOTOLIBRARY} : {}
    }

    const imageData = await this.camera.getPicture(options);

    this.classified.cla_foto = `${imageData}`;

    // this.photos.unshift(this.base64Image);

  }

  deletePhoto(){
    this.base64Image="";
  }
}
