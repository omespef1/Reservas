import { Component, NgZone } from "@angular/core";
import {
  IonicPage,
  NavController,
  Events,
  Platform,
  ModalController,
  LoadingController,
} from "ionic-angular";
import { NgForm } from "@angular/forms";
import { DomSanitizer } from "@angular/platform-browser";
//clases
import { general } from "../../class/general/general";
import { sessions } from "../../class/sessions/sessions";
import { GnAppDw, GnDigfl, user } from "../../class/models/models";
//Providers
import { PartnerProvider } from "../../providers/partner/partner";
import { ConnectionsProvider } from "../../providers/connections/connections";
import { CompaniesProvider } from "../../providers/companies/companies";
//Models
import { TOSoRsoci, GnConex, GnEmpre } from "../../class/models/models";
//plugins
import { KeychainTouchId } from "@ionic-native/keychain-touch-id";
//pages
import { PartnerConfirmPage } from "../partner-confirm/partner-confirm";
import { PartnerConnectionsPage } from "../partner-connections/partner-connections";
import { CompaniesPage } from "../companies/companies";
//config
import {
  appCopyright,
  appVersion,
  appAppStoreUrl,
  appGooglePlayUrl,
} from "../../assets/config/config";
import { transaction } from "../../class/Models/models";

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-login",
  templateUrl: "login.html",
})
export class LoginPage {
  user: any = { userAction: "", userPass: "" };
  register: TOSoRsoci = new TOSoRsoci();
  touchID: boolean = false;
  faceID: boolean = false;
  appVersion: string;
  appCopyright: string;
  passwordIcon: string = "eye";
  passwordType: string = "password";
  logo: any = "assets/imgs/logo.png";
  backgroundColor: string;
  placeHolderLogin: string = "Nro. Acción";
  private codeConfirm: string = "";
  private colorPri: string;
  private colorSeg: string;
  private colorTer: string;
  private fonClar: string;
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
    private _dom: DomSanitizer,
    private _conect: ConnectionsProvider,
    private _loading: LoadingController
  ) {
    this.appVersion = appVersion;
    this.appCopyright = appCopyright;
  }
  //Variable para controlar la pestaña visible (Login o registro)
  type: string = "login";

  async ionViewWillEnter() {
    await this.loadUserData();
  }

  async loadUserData() {
    let loadingModal = this._loading.create({
      content: "Cargando configuración",
    });
    loadingModal.present();
    this.CheckConnectionChanges().then(
      async () => {
        console.log("empresa escogida");
        await this.GetPartnerConnections();
        loadingModal.dismiss();
        this.events.publish("user:gnempre");
        await this.checkForGnDigfl();
        await this.CheckLastVersion();

        this.GetTouchId();
      },
      () => {
        loadingModal.dismiss();
      }
    );
  }

  onSubmit(f: NgForm) {
    this.doLogin(this.user.userAction, this.user.userPass);
  }
  doLogin(action: string, password: any) {
    if (this.IsLastVersion) {
      this._partner.GetPartner(action, password).then((resp: transaction) => {
        if (resp != null) {
          let thisUser: user = new user();
          thisUser = resp.ObjTransaction;
          thisUser.sbe_pass = password;
          this.setTouchId();
          this.events.publish("user:login", thisUser);
        }
      });
    } else this.GoUpdateApp();
  }
  onRegister(f: NgForm) {
    this.register.Emp_codi = this.session.GetClientEmpCodi();
    this._partner.SetPartner(this.register).then((resp: any) => {
      if (resp != null) {
        this.user = resp.ObjTransaction;
        this.navCtrl.push(PartnerConfirmPage, { partner: this.user });
      }
    });
  }

  GetTouchId() {
    if (this._platform.is("cordova")) {
      this._touch.has("fingerprint").then(() => {
        this._touch.isAvailable().then((type: any) => {
          if (type == "face") this.faceID = true;
          else this.touchID = true;
        });
        this._touch
          .verify("fingerprint", "Deslice su huella dactilar para ingresar")
          .then((pass) => {
            this.session.getUserFingerPrint().then((user) => {
              //Ya no va usar la contraseña y el usuaro del usuario, ya que al cambiar
              //la cotraseña el acceso biométrico falla, en su lugar accede directamente con los datos del usuario
              //guardados en el storage
              // this.doLogin(user, pass);
              this.setTouchId();
              this.session.GetLoggedin().then((user) => {
                this.events.publish("user:login", user);
              });
            });
          });
      });
    }
  }
  setTouchId() {
    if (this._platform.is("cordova")) {
      this._touch.isAvailable().then((type: any) => {
        if (type == "face") this.faceID = true;
        else this.touchID = true;
      });
      this._touch.has("fingerprint").catch((err) => {
        this.session.setUserFingerPrint(this.user.userAction);
        this._touch.save("fingerprint", this.user.userPass);
      });
    }
  }

  async GetPartnerConnections() {
    //Llena la variable de url de conexion ya sea desde la sesión o desde la bd
    let promise = new Promise((resolve, reject) => {
      this.session.getPartnerConnections().then((resp: GnConex) => {
        console.log("conexion leida");
        if (resp) {
          console.log("setea set client url porque ya la tiene");
          this.session.SetClientUrl(resp.CNX_IPSR);
          this.GetEmpCodiSession();
          this.logo = resp.CNX_LOGO;
          this.backgroundColor = resp.CNX_BACK;
          this.colorPri = resp.CNX_CPRI;
          this.colorSeg = resp.CNX_CSEG;
          this.colorTer = resp.CNX_CTER;
          this.fonClar = resp.CNX_FCLA;
          resolve();
        } else {
          let modalClient = this.modalCrl.create(PartnerConnectionsPage);
          modalClient.present();
          modalClient.onDidDismiss((resp: GnConex) => {
            this.session.setPartnerConnections(resp);
            this.session.SetClientUrl(resp.CNX_IPSR);
            this.GetEmpCodiSession().then(() => {
              resolve();
            });
            this.logo = resp.CNX_LOGO;
            this.backgroundColor = resp.CNX_BACK;
            this.colorPri = resp.CNX_CPRI;
            this.colorSeg = resp.CNX_CSEG;
            this.colorTer = resp.CNX_CTER;
            this.fonClar = resp.CNX_FCLA;
          });
        }
      });
    });
    return promise;
  }
  GetEmpCodiSession() {
    let promise = new Promise((resolve, reject) => {
      this.session.getEmpCodiSession().then((resp) => {
        console.log("empresa por defecto es ");
        console.log(resp);
        if (resp) {
          this.session.SetClientEmpCodi(resp);
          this.session.setEmpCodiSession(resp);
          resolve();
        } else {
          console.log("abre modal");
          let modalCompanies = this.modalCrl.create(CompaniesPage);
          modalCompanies.present();
          modalCompanies.onDidDismiss((resp: GnEmpre) => {
            this.session.SetClientEmpCodi(resp.Emp_Codi);
            this.session.setEmpCodiSession(resp.Emp_Codi);
            resolve();
          });
        }
      });
    });
    //Llena la variable del emp_codi ya sea desde la sesión o desde la bd si
    return promise;
  }
  showKey(): void {
    //Controla el icono de visualizar contraseña
    this.passwordType = this.passwordType === "text" ? "password" : "text";
    this.passwordIcon = this.passwordIcon === "eye-off" ? "eye" : "eye-off";
  }

  CheckLastVersion() {
    //Verifica si el usuario cuenta con la última versión y lo obliga a actualizar el app
    return this._connections.GetVersioning().then((resp: any) => {
      console.log(resp);
      if (resp.State) {
        let AppLastVersion: GnAppDw = resp.ObjResult;
        console.log(this.compareVersion(appVersion, AppLastVersion.App_Vers));
        if (this.compareVersion(appVersion, AppLastVersion.App_Vers) < 0) {
          this.IsLastVersion = false;
          this.GoUpdateApp();
        }
      }
    });
  }
  GoUpdateApp() {
    this.general
      .ShowMessageAlertAction(
        "Actualización Disponible",
        "Hay una nueva versión disponible de esta aplicación. Es necesario actualizar la aplicación para poder ingresar.Presiona aceptar para ir a la tienda y actualizar."
      )
      .then(() => {
        if (this._platform.is("ios")) this.general.openUrl(appAppStoreUrl);
        if (this._platform.is("android"))
          this.general.openUrl(appGooglePlayUrl);
      });
  }
  async checkForGnDigfl() {
    const digfl: any = <any>await this._companies.GetGnDigfl("SAE000001");

    if (digfl.ObjTransaction != null && digfl.Retorno == 0) {
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

  compareVersion(v1, v2) {
    if (typeof v1 !== "string") return false;
    if (typeof v2 !== "string") return false;
    v1 = v1.split(".");
    v2 = v2.split(".");
    const k = Math.min(v1.length, v2.length);
    for (let i = 0; i < k; ++i) {
      v1[i] = parseInt(v1[i], 10);
      v2[i] = parseInt(v2[i], 10);
      if (v1[i] > v2[i]) return 1;
      if (v1[i] < v2[i]) return -1;
    }
    return v1.length == v2.length ? 0 : v1.length < v2.length ? -1 : 1;
  }

  CheckConnectionChanges() {
    let promise: Promise<any> = new Promise((resolve, reject) => {
      try {
        this._conect.GetConnectionsAsync().then((resp: any) => {
          this.session.getPartnerConnections().then((respStorage: GnConex) => {
            if (resp == null) throw new Error("Error obteniendo conexiones");
            let arrConex: GnConex[] = resp.ObjResult;
            let NogalConex = arrConex.filter((n) => n.$id == 2)[0];
            this.SetConexiones(NogalConex);
            this.session.getEmpCodiSession().then((resp) => {
              console.log("empresa que carga es");
              console.log(resp);
              if (resp != null) {
                console.log("resuelve");
                resolve();
              }

              this._companies.GetGnEmpre().then((data: any) => {
                console.log("carga empresas ok");
                if (data == null || data == undefined)
                  throw new Error("No se encontraron empresas");
                let companies: any[] = data.ObjTransaction;
                 //let NogalCompanie = companies[0];
                //descomentarear para desarrollo
                let NogalCompanie = companies[3];
                this.SetEmpCodi(NogalCompanie.Emp_Codi);
                resolve();
              });
            });
          });
        });
      } catch (error) {
        this.general.showToastMessage(error, "bottom");
        reject();
      }
    });
    return promise;
  }

  SetConexiones(conex: any) {
    this.session.setPartnerConnections(conex);
    this.session.SetClientUrl(conex.CNX_IPSR);
  }
  SetEmpCodi(emp_codi: number) {
    this.session.SetClientEmpCodi(emp_codi);
    this.session.setEmpCodiSession(emp_codi);
  }
}
