import { Component } from '@angular/core';
import { IonicPage, NavController, Events, Platform } from 'ionic-angular';
import { NgForm } from '@angular/forms';

//clases
import { general } from '../../class/general/general';
import { sessions } from '../../class/sessions/sessions';
//Providers
import { PartnerProvider } from '../../providers/partner/partner';
//Models
import { TOSoRsoci } from '../../class/Models/models';
//plugins
import { KeychainTouchId } from '@ionic-native/keychain-touch-id';
//pages
import {PartnerConfirmPage} from '../partner-confirm/partner-confirm';



/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  user: any = { userAction: "18000501", userPass: "evc426" }
  register: TOSoRsoci = new TOSoRsoci();
  touchID: boolean = false;
  private codeConfirm: string = "";

  constructor(
    private _partner: PartnerProvider,
    private general: general,
    private session: sessions,
    private events: Events,
    private _touch: KeychainTouchId,
    private _platform: Platform,
    private navCtrl:NavController
  ) {

  }
  //Variable para controlar la pestaña visible (Login o registro)
  type: string = "login";

  ionViewDidLoad() {
    this.GetTouchId();
  }

  onSubmit(f: NgForm) {
    this.doLogin(this.user.userAction, this.user.userPass);
  }
  doLogin(action: string, password: any) {
    this._partner.GetPartner(action, password).then((resp: any) => {
      if (resp != null) {
        console.log(resp);
        this.setTouchId()
        this.events.publish('user:login', resp.ObjTransaction);
      }
    })
  }
  onRegister(f: NgForm) {
    this._partner.SetPartner(this.register).then((resp: any) => {
      if (resp != null) {
        // if (resp.ObjTransaction.Soc_cing != "0") {
          this.user= resp.ObjTransaction;
           this.navCtrl.push(PartnerConfirmPage,{'partner':this.user})
        // }
        // else {
        //   this.general.showToastMessage('Información actualizada!', 'bottom');
        //   f.reset();
        // }
      }
    })
  }
  // showConfirmCode() {
  //   this.general.showMessageInput('Confirmación de registro', 'Ingrese el código de confirmación enviado a su correo electrónico para terminar el registro',
  //     'title', 'Código de confirmación', this.codeConfirm).then((code: number) => {
  //       if(code == this.user.Soc_cing){
  //         this.navCtrl.push(PartnerConfirmPage)
  //         //  this._partner.SetRegister()
  //       }
  //     })
  // }


  GetTouchId() {
    if (this._platform.is("cordova")) {
      this._touch.has("fingerprint").then(() => {
        this._touch.verify("fingerprint", 'Deslice su huella dactilar para ingresar').then(pass => {
          this.touchID = true;
          this.session.getUserFingerPrint().then(user => {
            this.doLogin(user, pass);
          })

        })
      })
    }
  }
  setTouchId() {
    if (this._platform.is("cordova")) {
      this._touch.isAvailable().then(() => {
        this._touch.has("fingerprint").catch(err => {
          this.session.setUserFingerPrint(this.user.userAction);
          this._touch.save("password", this.user.userPass);
        })
      })
    }
  }

}
