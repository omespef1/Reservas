import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { agreement, transaction } from "../../class/models/models";
import { AgreementsProvider } from '../../providers/agreements/agreements';
import { general } from '../../class/general/general';
import { sessions } from '../../class/sessions/sessions';

/**
 * Generated class for the InstitutionalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-institutional',
  templateUrl: 'institutional.html',
})
export class InstitutionalPage {
  source:agreement[];
  constructor(private _agreement: AgreementsProvider, private _general: general, private _platform: Platform,private _session:sessions) {
  }

  ionViewDidLoad() {
    //Carga los convenios
    this.getAgreeements();
  }
  getAgreeements() {
    this._agreement.GetInstitutional().then((resp: transaction) => {
      //Si la respuesta trae es diferente de null llena la variable asociada a la parte gráfica
      if (resp && resp.ObjTransaction!=null) {
        this.source = resp.ObjTransaction;
      }
    })
  }
  //Abre una url en el navegador
  openUrl(myAgreement: agreement) {

    //Si el link de página web viene vacío intenta abre los links definidos paera cada plataforma en programa SAEOSAPP
    if (myAgreement.Osa_Link.length  <=1) {
      if (this._platform.is('android'))
        this._general.openUrl(myAgreement.Osa_Lian);
      if (this._platform.is('ios'))
        this._general.openUrl(myAgreement.Osa_Liap);    
    }
    //Si no, entonces abre el link de página web
    if(myAgreement.Osa_Link.length>0)
    this._general.openUrl(myAgreement.Osa_Link);

  }


  
}
