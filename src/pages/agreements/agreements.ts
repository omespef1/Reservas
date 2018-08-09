import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AgreementsProvider } from '../../providers/agreements/agreements';
//clases
import { transaction } from '../../class/models/models';
import { general } from '../../class/general/general';


/**
 * Generated class for the AgreementsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-agreements',
  templateUrl: 'agreements.html',
})
export class AgreementsPage {
  agreements: any[];
  constructor(private _agreement: AgreementsProvider, private _general: general) {
  }

  ionViewDidLoad() {
    //Carga los convenios
    this.getAgreeements();
  }
  getAgreeements() {
    this._agreement.GetAgreements().then((resp: transaction) => {
      //Si la respuesta trae es diferente de null llena la variable asociada a la parte gráfica
      if (resp.ObjTransaction != null) {
        this.agreements = resp.ObjTransaction;
      }
    })
  }
  //Abre una url en el navegador
  openUrl(url: string) {
    this._general.openUrl(url);
  }

}
