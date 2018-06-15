import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {PartnerProvider} from '../../providers/partner/partner';
import { NgForm }   from '@angular/forms';

//clases
import {general} from '../../class/general/general';
import {sessions} from '../../class/sessions/sessions';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  user:any ={userAction:"",userPass:""}
  constructor(private _partner:PartnerProvider,private general:general,private session:sessions) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }




onSubmit(f: NgForm){
  this._partner.GetPartner(this.user.userAction, this.user.userPass).then((resp: any) => {
    console.log('then');
    if (resp != null) {
      this.session.loggedIn(resp.ObjTransaction);
    }
  })
}
}
