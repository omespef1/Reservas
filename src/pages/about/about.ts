import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
//clases
import {general} from '../../class/general/general';
//config
import {SERVICES_URL,developer,developerFacebook,developerMail,developerWeb,developerTwitter,appCopyright,appVersion} from '../../assets/config/config';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
appVersion:string;
developer:string;
developerFacebook:string;
developerMail:string;
developerWeb:string;
developerTwitter:string;
appCopyright:string;

  constructor(private _general:general) {
this.appVersion = appVersion;
this.developer = developer;
this.developerFacebook = developerFacebook;
this.developerMail = developerMail;
this.developerWeb = developerWeb;
this.developerTwitter = developerTwitter
this.appCopyright = appCopyright;
  }
  //Abre en el navegador una url
  openBrowser(url:string){
    this._general.openUrl(url);
  }

}
