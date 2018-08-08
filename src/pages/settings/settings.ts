import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Events } from 'ionic-angular';
import {   sessions } from '../../class/sessions/sessions';
//pages
import { PartnerDetailPage } from '../partner-detail/partner-detail';
import {AboutPage } from '../about/about';

/**
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {
  user: any = {};
  constructor(private _sessions: sessions,
    private _modalCtrl: ModalController,
    private _events: Events,
    private navCtrl:NavController) {
    this._sessions.GetLoggedin().then(user => {
      this.user = user;
    })
  }

  showPartnerDetail(partner: any) {
    let modal = this._modalCtrl.create(PartnerDetailPage, { 'user': partner });
    modal.present();
  }
  sessionOut() {
    this._events.publish('user:logout');
  }
  GoAbout() {
  this.navCtrl.push(AboutPage);
  }
}
