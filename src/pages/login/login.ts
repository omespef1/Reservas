import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, Events, Platform, ModalController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import {DomSanitizer} from '@angular/platform-browser';
//clases
import { general } from '../../class/general/general';
import { sessions } from '../../class/sessions/sessions';
import { GnAppDw, GnDigfl } from '../../class/models/models';
//Providers
import { PartnerProvider } from '../../providers/partner/partner';
import { ConnectionsProvider } from '../../providers/connections/connections';
import { CompaniesProvider } from '../../providers/companies/companies';
//Models
import { TOSoRsoci, GnConex, GnEmpre } from '../../class/models/models';
//plugins
import { KeychainTouchId } from '@ionic-native/keychain-touch-id';
//pages
import { PartnerConfirmPage } from '../partner-confirm/partner-confirm';
import { PartnerConnectionsPage } from '../partner-connections/partner-connections';
import { CompaniesPage } from '../companies/companies';
//config
import { appCopyright, appVersion, appAppStoreUrl, appGooglePlayUrl } from '../../assets/config/config';


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
  passwordIcon: string = "eye";
  passwordType: string = "password";
  logo: any = 'assets/imgs/logo.png';
  progressStatus: string = "";
  placeHolderLogin: string = "Nro. Acción"
  private codeConfirm: string = "";
  private IsLastVersion = true;

  constructor(
    private _partner: PartnerProvider,
    private general: general,
    private session: sessions,
    private events: Events,
    private _touch: KeychainTouchId,
    private _platform: Platform,
    private navCtrl: NavController,
    private _connections: ConnectionsProvider,
    private modalCrl: ModalController,
    private _companies: CompaniesProvider,
    private _dom:DomSanitizer

  ) {
    this.appVersion = appVersion;
    this.appCopyright = appCopyright;
      console.log(this.logo);
  

  }
  //Variable para controlar la pestaña visible (Login o registro)
  type: string = "login";

  ionViewDidLoad() {


  }
  ionViewDidEnter() {


  this.loadUserData();


  }

  async loadUserData() {
    await   this.GetPartnerConnections();
    const emp_codi = await <any>this.session.getEmpCodiSession();
    console.log(emp_codi);
    this.GetTouchId();
    console.log('touch');
    await this.checkForGnDigfl();
    console.log('digfl');
    this.CheckLastVersion();
    console.log('version');

  }

  onSubmit(f: NgForm) {
    this.doLogin(this.user.userAction, this.user.userPass);
  }
  doLogin(action: string, password: any) {
    if (this.IsLastVersion) {
      this._partner.GetPartner(action, password).then((resp: any) => {
        if (resp != null) {
          console.log(resp);
          this.setTouchId()
          this.events.publish('user:login', resp.ObjTransaction);
        }
      })
    }
    else
      this.GoUpdateApp();
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
        this.touchID = true;
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
        this.touchID = true;
        this._touch.has("fingerprint").catch(err => {
          this.session.setUserFingerPrint(this.user.userAction);
          this._touch.save("fingerprint", this.user.userPass);
        })
      })
    }
  }

  async GetPartnerConnections() {
    //Llena la variable de url de conexion ya sea desde la sesión o desde la bd
    let promise = new Promise((resolve,reject)=>{
      this.session.getPartnerConnections().then((resp: GnConex) => {
        if (resp) {
          this.session.SetClientUrl(resp.CNX_IPSR);
          this.GetEmpCodiSession();
          this.logo = resp.CNX_LOGO;
          resolve();
        }
        else {
          let modalClient = this.modalCrl.create(PartnerConnectionsPage);
          modalClient.present();
          modalClient.onDidDismiss((resp: GnConex) => {
            this.session.setPartnerConnections(resp);
            this.session.SetClientUrl(resp.CNX_IPSR);
            this.GetEmpCodiSession().then(()=>{
              resolve();
            })
            this.logo =  this._dom.bypassSecurityTrustHtml(resp.CNX_LOGO);

          })
        }
      })
    })
      return promise;
  }
  GetEmpCodiSession() {
    let promise = new Promise((resolve,reject)=>{
      this.session.getEmpCodiSession().then(resp => {
        if (resp) {
          this.session.SetClientEmpCodi(resp);
          this.session.setEmpCodiSession(resp);
          resolve();
        }
        else {
          let modalCompanies = this.modalCrl.create(CompaniesPage);
          modalCompanies.present();
          modalCompanies.onDidDismiss((resp: GnEmpre) => {
            this.session.SetClientEmpCodi(resp.Emp_Codi);
            this.session.setEmpCodiSession(resp.Emp_Codi);
              resolve();
          })
        }
      })
    })
    //Llena la variable del emp_codi ya sea desde la sesión o desde la bd si
    return promise;
  }
  showKey(): void {
    //Controla el icono de visualizar contraseña
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
    this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
  }

  CheckLastVersion() {
    //Verifica si el usuario cuenta con la última versión y lo obliga a actualizar el app
    return this._connections.GetVersioning().then((resp: any) => {
      if (resp.State) {
        let AppLastVersion: GnAppDw = resp.ObjResult;
        if (appVersion != AppLastVersion.App_Vers) {
          this.IsLastVersion = false;
          this.GoUpdateApp();
        }
      }
    })
  }
  GoUpdateApp() {
    this.general.ShowMessageAlertAction('Actualización Disponible',
      'Hay una nueva versión disponible de esta aplicación. Es necesario actualizar la aplicación para poder ingresar.Presiona aceptar para ir a la tienda y actualizar.').then(() => {
        if (this._platform.is("ios"))
          this.general.openUrl(appAppStoreUrl);
        if (this._platform.is("android"))
          this.general.openUrl(appGooglePlayUrl);
      })
  }
  async checkForGnDigfl() {
    const digfl: any = <any>await this._companies.GetGnDigfl('SAE000001')
    if (digfl.Retorno == 0) {
      let digFl: GnDigfl = digfl.ObjTransaction;
      if (digFl.dig_valo.toUpperCase() == "S")
        this.placeHolderLogin = "Número de identificación";
    }
    // })
  }
  // CheckLastPackage(){
  //   ///Codigo pendiente para actualización a través de inyección de código: Se encuentra en version alpha
  //   if (this._platform.is("cordova")) {
  //     this._codePush.sync({}, (progress) => {
  //       this._ngZone.run(() => {
  //         this.progressStatus = JSON.stringify(progress);
  //       })
  //     }).subscribe((status) => {
  //       if (status == SyncStatus.CHECKING_FOR_UPDATE)
  //         this.general.ShowMessageAlert("Sistema", "Buscando actualizaciones...");
  //       if (status == SyncStatus.DOWNLOADING_PACKAGE)
  //         this.general.ShowMessageAlert("Sistema", "Descargando paquetes...");
  //       if (status == SyncStatus.IN_PROGRESS)
  //         this.general.ShowMessageAlert("Sistema", "En progreso...");
  //       if (status == SyncStatus.INSTALLING_UPDATE)
  //         this.general.ShowMessageAlert("Sistema", "Instalando paquetes...");
  //       if (status == SyncStatus.UP_TO_DATE)
  //         this.general.ShowMessageAlert("Sistema", "Paquetes ya instalados!");
  //       if (status == SyncStatus.UPDATE_INSTALLED)
  //         this.general.ShowMessageAlert("Sistema", "Paquetes instalados!...");
  //       if (status == SyncStatus.ERROR)
  //         this.general.ShowMessageAlert("Sistema", "Error descargando paquetes...");
  //     })
  //   }
  // }
}
