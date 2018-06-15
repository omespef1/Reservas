import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HistoryProvider } from '../../providers/history/history';

/**
 * Generated class for the HistoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-history',
  templateUrl: 'history.html',
})
export class HistoryPage {
  histories: any = {};
  constructor(public navCtrl: NavController, public navParams: NavParams, private _history: HistoryProvider) {
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad HistoryPage');
  }

  GetHistory() {
    let history: any = {}; //Se debe definir como se crea este objeto para ir a traer los Consumos
    this._history.GetHistory(history).then((resp: any) => {
      if (resp != null) {
        this.histories = resp;
      }
    })
  }
}
