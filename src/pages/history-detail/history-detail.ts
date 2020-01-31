import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { detalleConsumo } from '../../class/models/models';

/**
 * Generated class for the HistoryDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-history-detail',
  templateUrl: 'history-detail.html',
})
export class HistoryDetailPage {
detail:detalleConsumo;
  constructor(public navCtrl: NavController, public navParams: NavParams,private _view:ViewController) {
    this.detail = this.navParams.get('detalle');
    console.log(this.detail);
  }

  ionViewDidLoad() {
   
  }

  closeModal(){
    console.log('cerrando');
   this._view.dismiss();
  }

}
