import { Component } from '@angular/core';
import { IonicPage, NavController, Events, Platform, ModalController } from 'ionic-angular';
import { NgForm } from '@angular/forms';

//clases
import { general } from '../../class/general/general';
import { sessions } from '../../class/sessions/sessions';
//Providers
import { PartnerProvider } from '../../providers/partner/partner';
import { ConnectionsProvider } from '../../providers/connections/connections';
//Models
import { TOSoRsoci, GnConex, GnEmpre } from '../../class/models/models';
//plugins
import { KeychainTouchId } from '@ionic-native/keychain-touch-id';
//pages
import { PartnerConfirmPage } from '../partner-confirm/partner-confirm';
import { PartnerConnectionsPage } from '../partner-connections/partner-connections';
import { CompaniesPage } from '../companies/companies';
//config
import { appCopyright, appVersion } from '../../assets/config/config';


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
  user: any = { userAction: "", userPass: "" }
  register: TOSoRsoci = new TOSoRsoci();
  touchID: boolean = false;
  appVersion: string;
  appCopyright: string;
  passwordIcon:string="eye";
  passwordType:string="password";
  private codeConfirm: string = "";

  constructor(
    private _partner: PartnerProvider,
    private general: general,
    private session: sessions,
    private events: Events,
    private _touch: KeychainTouchId,
    private _platform: Platform,
    private navCtrl: NavController,
    private _connections: ConnectionsProvider,
    private modalCrl: ModalController
  ) {
    this.appVersion = appVersion;
    this.appCopyright = appCopyright;
    this.GetPartnerConnections();

  }
  //Variable para controlar la pestaña visible (Login o registro)
  type: string = "login";

  ionViewDidLoad() {

  }
  ionViewDidEnter() {
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
    this.register.Emp_codi = this.session.GetClientEmpCodi();
    this._partner.SetPartner(this.register).then((resp: any) => {
      if (resp != null) {
        this.user = resp.ObjTransaction;
        this.navCtrl.push(PartnerConfirmPage, { 'partner': this.user })

      }
    })
  }

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
          this._touch.save("fingerprint", this.user.userPass);
        })
      })
    }
  }

  GetPartnerConnections() {
    //Llena la variable de url de conexion ya sea desde la sesión o desde la bd si
    this.session.getPartnerConnections().then((resp: GnConex) => {
      if (resp) {
        this.session.SetClientUrl(resp.CNX_IPSR);
        this.GetEmpCodiSession();
      }
      else {
        let modalClient = this.modalCrl.create(PartnerConnectionsPage);
        modalClient.present();
        modalClient.onDidDismiss((resp: GnConex) => {
          this.session.setPartnerConnections(resp);
            this.session.SetClientUrl(resp.CNX_IPSR);
          this.GetEmpCodiSession();
        })
      }
    })
  }
  GetEmpCodiSession() {
    //Llena la variable del emp_codi ya sea desde la sesión o desde la bd si
    this.session.getEmpCodiSession().then(resp => {
      if (resp) {
          this.session.SetClientEmpCodi(resp);
          this.session.setEmpCodiSession(resp);
      }
      else {
        let modalCompanies = this.modalCrl.create(CompaniesPage);
        modalCompanies.present();
        modalCompanies.onDidDismiss((resp: GnEmpre) => {
          this.session.SetClientEmpCodi(resp.Emp_Codi);
          this.session.setEmpCodiSession(resp.Emp_Codi);

        })
      }
    })
  }
  showKey(){
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
    this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
  }

}
