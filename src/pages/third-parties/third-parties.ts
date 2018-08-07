import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Ifactory, disponibilityRequest } from '../../class/models/models';
//providers
import { ThirdPartiesProvider } from '../../providers/third-parties/third-parties';
import * as moment from 'moment';
//clases
import {transaction} from '../../class/models/models';
import {general} from '../../class/general/general';
//Pages
import {DisponibilityPage} from '../../pages/disponibility/disponibility';
import {ConfirmPage} from '../confirm/confirm';
/**
 * Generated class for the ThirdPartiesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-third-parties',
  templateUrl: 'third-parties.html',
})
export class ThirdPartiesPage {
  newFactory: Ifactory;
  newDisponibilityRequest: disponibilityRequest = new disponibilityRequest();
  thirdParties:any;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private _third: ThirdPartiesProvider,
  private _general:general) {
    this.newFactory = navParams.get('booking');
    this.newDisponibilityRequest.Cla_cont = this.newFactory.class.Cla_cont;
    this.newDisponibilityRequest.pro_cont = this.newFactory.product.Pro_cont;
    this.newDisponibilityRequest.Op_Disp = this.newFactory.optionDisp.OpDisp;
    if (this.newFactory.optionDisp.OpDisp == "F") {
      this.newDisponibilityRequest.startTime =   moment(this.newFactory.agend.startTime).format();
      this.newDisponibilityRequest.endTime = moment(this.newFactory.agend.endTime).format();
    }
    else {
      console.log('Fechas nulas ya que la busqueda es por profesional')
      this.newDisponibilityRequest.startTime = null;
      this.newDisponibilityRequest.endTime = null;
    }
    this.getThirdParties();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ThirdPartiesPage');
  }
  getThirdParties(){
        this._third.GetThirParties(this.newDisponibilityRequest).then((thirdparties:transaction)=>{
          this.thirdParties = thirdparties.ObjTransaction;
          if(this.thirdParties.length==0){
            if(this.newFactory.optionDisp.OpCodi='P')
              this._general.ShowMessageAlert('Terceros no encontrados','No se encontraron terceros asociados al producto');
              if(this.newFactory.optionDisp.OpCodi='F')
                this._general.ShowMessageAlert('Terceros no encontrados','No se encontraron terceros en el horario seleccionado');
          }

        })
  }
  SetThirdPartie(thirdPartie:any){
    this.newFactory.thirdPartie = thirdPartie;
     // this.navCtrl.push(DisponibilityPage, {'booking': this.newFactory});
    if(this.newFactory.optionDisp.OpDisp=='P')
     this.navCtrl.push(DisponibilityPage, {'booking': this.newFactory});
     else {
       this.navCtrl.push(ConfirmPage , {'booking':this.newFactory});
     }
  }

}
