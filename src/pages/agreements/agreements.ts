import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { AgreementsProvider } from '../../providers/agreements/agreements';
//clases
import { transaction, agreement } from '../../class/models/models';
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
  agreements: agreement[];
  constructor(private _agreement: AgreementsProvider, private _general: general, private _platform: Platform) {
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
  openUrl(myAgreement: agreement) {

    //Si el link de página web viene vacío intenta abre los links definidos paera cada plataforma en programa SAEOSAPP
    if (myAgreement.Osa_Link.length == 0) {
      if (this._platform.is('android'))
        this._general.openUrl(myAgreement.Osa_Lian);
      if (this._platform.is('ios'))
        this._general.openUrl(myAgreement.Osa_Liap);    
    }
    //Si no, entonces abre el link de página web
    if(myAgreement.Osa_Link.length>0)
    this._general.openUrl(myAgreement.Osa_Link);

  }
