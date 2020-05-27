import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { aeosapp } from '../../class/models/models';

/**
 * Generated class for the NetworkingNewsViewerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-networking-news-viewer',
  templateUrl: 'networking-news-viewer.html',
})
export class NetworkingNewsViewerPage {
 notice:aeosapp= new aeosapp();
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.notice = this.navParams.get('new');
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad NetworkingNewsViewerPage');
  }

}
