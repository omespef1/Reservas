import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
//providers
import {PqrProvider } from '../../providers/pqr/pqr';
import {sessions } from '../../class/sessions/sessions';


/**
 * Generated class for the PqrPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pqr',
  templateUrl: 'pqr.html',
})
export class PqrPage {
 pqrs:any[]= [];
 user:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private _pqr:PqrProvider,private session:sessions) {
  }

  ionViewDidLoad() {

    this.session.GetLoggedin().then(resp => {
      this.user = resp;
    this.GetPqrs();
    })

  }

  GetPqrs(){
    this._pqr.GetPqr(this.user).then((response:any)=>{
      this.pqrs=  response.ObjTransaction;
    })
  }
  toggleSection(pqr) {
    pqr.open = !pqr.open;
  }



}
