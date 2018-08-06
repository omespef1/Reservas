import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NgForm } from '@angular/forms';
//Providers
import { PartnerProvider } from '../../providers/partner/partner';
//clases
import { TOSoRsoci,transaction } from '../../class/Models/models';
import { general } from '../../class/general/general';
//pages
import {LoginPage} from '../login/login';


/**
 * Generated class for the PartnerConfirmPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-partner-confirm',
  templateUrl: 'partner-confirm.html',
})
export class PartnerConfirmPage {
  partner: TOSoRsoci = new TOSoRsoci();
  ConfirmCode: string = "";
  ConfirmPassword: string;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private _partner: PartnerProvider,
    private _general: general) {
    this.partner = navParams.get('partner');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PartnerConfirmPage');
  }

  setPartner(r: NgForm) {
    try {
      if (this.partner.Soc_cing != this.ConfirmCode)
        throw new Error("El código de confirmación no es correcto");
      if (this.partner.Sbe_pass != this.ConfirmPassword)
        throw new Error("Las contraseñas deben coincidir");
        this._partner.SetPartner(this.partner).then((resp:transaction)=>{
          if(resp!=null){
            this._general.ShowMessageAlert('Transacción exitosa!','Ya puede realizar el ingreso con sus datos de acceso en la pestaña Login')
            r.reset();
            this.navCtrl.push(LoginPage);
          }
        })

    }
    catch (err) {
      this._general.showToastMessage(err, 'bottom')
    }


  }

}
