import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Refresher } from 'ionic-angular';
//providers
import { PqrProvider } from '../../providers/pqr/pqr';
//clases
import { sessions } from '../../class/sessions/sessions';
import { general } from '../../class/general/general';
//Pages
import { PqrDetailPage } from '../../pages/pqr-detail/pqr-detail';
import {NewPqrPage} from '../../pages/new-pqr/new-pqr';


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
  pqrs: any[] = [];
  pqrsList: any[] = [];
  user: any = {};
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private _pqr: PqrProvider,
    private session: sessions,
    private _general: general) {
  }

  ionViewDidLoad() {
    this.session.GetLoggedin().then(resp => {
      this.user = resp;
      this.GetPqrs();
    })

  }

  GetPqrs() {
    this._pqr.GetPqr(this.user).then((response: any) => {
      if(response!=null){
      console.log(response);
      this.pqrs = response.ObjTransaction;
      this.initializeItems();
      }
    })
  }
  toggleSection(pqr) {
    pqr.open = !pqr.open;
  }
  doRefresh(refresher: Refresher) {
    this._pqr.GetPqr(this.user).then((resp: any) => {
      this.pqrs = resp.ObjTransaction;
      this.initializeItems();
      refresher.complete();
      // this._general.showToastMessage('Reservas actualizadas!', 'bottom')
    }).catch(err => {
      this._general.showToastMessage(err, 'bottom')
      //Error
    })
  }
  initializeItems(): void {
    this.pqrsList = this.pqrs;
  }
  getItems(q: string) {
    //Reseteo los items a su estado original
    this.initializeItems();
    //Si el valor es vacío ni filtra ndada
    if (!q || q.trim() === '') {
      return;
    }
    //Realiza el filtrado
    this.pqrsList = this.pqrsList.filter((v) => v.inp_cont.toString().indexOf(q.toString()) > -1);
  }
  OpenTrace(trace: any, event) {
    let pop = this.navCtrl.push(PqrDetailPage, { 'trace': trace });
  }
  newPqr(){
    this.navCtrl.push(NewPqrPage);
  }
}
