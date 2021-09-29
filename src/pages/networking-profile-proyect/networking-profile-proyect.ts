import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { soclanw } from '../../class/models/soclanw/soclanw';
import { sodpern } from '../../class/models/models';
import { CameraProvider } from '../../providers/camera/camera';


/**
 * Generated class for the NetworkingProfileProyectPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-networking-profile-proyect',
  templateUrl: 'networking-profile-proyect.html',
})
export class NetworkingProfileProyectPage {
  proyect:sodpern= new sodpern();
  constructor(public navCtrl: NavController, public navParams: NavParams,private _view:ViewController,private camera:CameraProvider) {
    this.proyect = this.navParams.get('proyect');
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad NetworkingProfileProyectPage');
  }


  SetNewProyecyt(){
  this._view.dismiss(this.proyect);
  }


  closeModal(){
    this._view.dismiss();
  }

  loadCamera(){
    this.camera.openeditprofile().then((resp:string)=>{
      this.proyect.dpe_fpro = resp;
    })
}

deletePhoto(){
  this.proyect.dpe_fpro="";
}

}
