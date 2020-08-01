import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the NetworkingImageViewerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-networking-image-viewer',
  templateUrl: 'networking-image-viewer.html',
})
export class NetworkingImageViewerPage {
  image:any;
   constructor(public navCtrl: NavController, public navParams: NavParams) 
  {
  }

  ionViewDidLoad() {
   this.image = this.navParams.get('image');
  }

}
