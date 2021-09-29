import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { soclanw } from '../../class/models/soclanw/soclanw';

/**
 * Generated class for the NetworkingClassifiedViewerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-networking-classified-viewer',
  templateUrl: 'networking-classified-viewer.html',
})
export class NetworkingClassifiedViewerPage {
classified:soclanw;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.classified = this.navParams.get('classified');
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad NetworkingClassifiedViewerPage');
  }

}
