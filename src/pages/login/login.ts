import { Component } from '@angular/core';
import { IonicPage, NavController, Events } from 'ionic-angular';
import { NgForm } from '@angular/forms';

//clases
import { general } from '../../class/general/general';
import { sessions } from '../../class/sessions/sessions';
//Providers
import { PartnerProvider } from '../../providers/partner/partner';
import { RegisterProvider } from '../../providers/register/register';
//Models
import { TOSoRsoci } from '../../class/Models/models';
//clases

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
  private codeConfirm:string="";

  constructor(
    private _partner: PartnerProvider,
    private general: general,
    private session: sessions,
    private events: Events,
    private _register: RegisterProvider
    ) {

  }

  type: string = "login";

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  onSubmit(f: NgForm) {
    this._partner.GetPartner(this.user.userAction, this.user.userPass).then((resp: any) => {
      if (resp != null) {
        console.log(resp);
        this.events.publish('user:login', resp.ObjTransaction);
      }
    })
  }
  onRegister(f: NgForm) {
    this._register.SetRegister(this.register).then((resp:any)=>{
      if(resp!=null){
        if(resp.Soc_cing!="0"){
          this.codeConfirm = resp.Soc_cing;
          this.showConfirmCode();
        }
        else {
          this.general.showToastMessage('Información actualizada,por favor ingrese','bottom');
          f.reset();
        }
      }
    })
  }
  showConfirmCode(){
    this.general.showMessageInput('Confirmación de registro','Ingrese el código de confirmación enviado a su correo electrónico para terminar el registro',
     'title','Código de confirmación',this.codeConfirm).then((code:number)=>{

    })
  }
}
