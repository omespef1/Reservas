import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
//providers
import {MainTemplatesProvider} from '../../providers/main-templates/main-templates';
//models
import { transaction } from '../../class/Models/models';

/**
 * Generated class for the MainTemplatesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-main-templates',
  templateUrl: 'main-templates.html',
})

export class MainTemplatesPage {
  items:any[];
  constructor(public navCtrl: NavController, public navParams: NavParams, private _main:MainTemplatesProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MainTemplatesPage');
  }

  async GetEcMcomp():Promise<void>{
       let transact : transaction =   <transaction> await  this._main.GetEcMconmp()
       if(transact!=null){
         if(transact.Retorno==0)
          this.items = transact.ObjTransaction;
       }
  }

}
