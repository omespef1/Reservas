import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {  sessions} from '../../class/sessions/sessions';

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
  user:any={};
  constructor(private _sessions:sessions) {
    this._sessions.GetLoggedin().then(user=>{
      this.user = user;
    })
  }



}
