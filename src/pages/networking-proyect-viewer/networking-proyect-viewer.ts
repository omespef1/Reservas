import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the NetworkingProyectViewerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-networking-proyect-viewer',
  templateUrl: 'networking-proyect-viewer.html',
})
export class NetworkingProyectViewerPage {
 proyect:any={};
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.proyect = this.navParams.get('proyect');
  }

}
