import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { aeosapp } from '../../class/models/models';
import { DomSanitizer } from '@angular/platform-browser';
import { LinkifyPipe } from '../../pipes/linkify/linkify';

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
 safeURL;
  constructor(public navCtrl: NavController, public navParams: NavParams,private _sanitizer: DomSanitizer) {
    this.notice = this.navParams.get('new');
    this.safeURL = this._sanitizer.bypassSecurityTrustResourceUrl(this.notice.osa_livi);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad NetworkingNewsViewerPage');
  }

  getVideoIframe(url) {
    console.log(url);
    var video, results;
 
    if (url === null) {
        return '';
    }
    results = url.match('[\\?&]v=([^&#]*)');
    video   = (results === null) ? url : results[1];
 
    return this._sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + video);   
}




}
