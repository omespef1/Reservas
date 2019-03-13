import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { eccotiz, payment, user } from '../../class/models/models';
import { sessions } from '../../class/sessions/sessions';

/**
 * Generated class for the EventCotizDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-event-cotiz-detail',
  templateUrl: 'event-cotiz-detail.html',
})
export class EventCotizDetailPage {
 cotiz:eccotiz=new eccotiz();

  constructor(public navCtrl: NavController, public navParams: NavParams,private _sesion:sessions) {
    this.cotiz = this.navParams.get('cotiz');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventCotizDetailPage');
  }
async pay(){
  let arrContiz: number[] = [];
  arrContiz.push(this.cotiz.cot_cont);
  let user:user = <user> await this._sesion.GetLoggedin();
  let emp_codi = this._sesion.GetClientEmpCodi();
  let _pay: payment = {
    sbe_codi: user.Sbe_codi, emp_codi: emp_codi, sbe_ncar: user.Sbe_ncar, valor: this.total,
    soc_mail: user.Sbe_mail, productos: arrContiz
  }
}
}
