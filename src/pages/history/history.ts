import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HistoryProvider } from '../../providers/history/history';
//clase
import {sessions} from '../../class/sessions/sessions';

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
  histories: any[];
  user:any;
  myDate:string="";
  constructor(private _history: HistoryProvider,private session:sessions) {
  }
  ionViewDidLoad() {
    this.session.GetLoggedin().then(resp => {
      this.user = resp;
      // this.GetHistory();
    })
  }

  GetHistory() {
    console.log(this.myDate);
    let history: any = {Soc_cont: this.user.Soc_cont,Sbe_cont:this.user.Sbe_cont,fac_mesp: this.myDate.split('-')[1],fac_anop:this.myDate.split('-')[0]}; //Se debe definir como se crea este objeto para ir a traer los Consumos
    console.log(this.myDate.split('-')[0]);
    console.log(this.myDate.split('-')[1]);

    this._history.GetHistory(history).then((resp: any) => {
      if (resp != null) {
        this.histories = resp.ObjTransaction;
      }
    })
  }
}
