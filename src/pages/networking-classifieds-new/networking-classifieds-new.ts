import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ViewController,
} from "ionic-angular";
import { general } from "../../class/general/general";
import { SoclanwProvider } from "../../providers/soclanw/soclanw";
import { soclanw } from "../../class/models/soclanw/soclanw";
import { transaction, user } from "../../class/models/models";
import { sessions } from "../../class/sessions/sessions";

/**
 * Generated class for the NetworkingClassifiedsNewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-networking-classifieds-new",
  templateUrl: "networking-classifieds-new.html",
})
export class NetworkingClassifiedsNewPage {
  sending = false;
  termsreceived = "";
  user: user = new user();
  classified: soclanw = new soclanw();
  editMode=false;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private _general: general,
    private _soclanw: SoclanwProvider,
    private _sesion: sessions,
    private _view: ViewController
  ) {
    this._sesion.GetLoggedin().then((resp: user) => {
      this.user = resp;
    });
  }

  ionViewDidLoad() {
    if(this.navParams.get('editClassified'))
    this.editMode=true;
    if(!this.editMode)
    this.classified = new soclanw();
    else {
      this.classified = this.navParams.get('editClassified')
    }
  }


  Ok(){
    if(!this.editMode)
    this.SetClassified();
    else
    this.updateClassified();

  }

  SetClassified() {
    this.sending = true;
 
    this.classified.emp_codi = this._sesion.GetClientEmpCodi();
    this.classified.mac_nume = this.user.Mac_nume1;
    this.classified.soc_cont = this.user.Soc_cont;
    this.classified.sbe_cont = this.user.Sbe_cont;
    this._soclanw.SetSoClanw(this.classified).then((resp: transaction) => {
      this.sending = false;

      if (resp != null && resp.Retorno == 0) {
        this._general.showCustomAlert(
          "¡Hemos recibido la solicitud de su clasificado!",
          this._sesion.getAeParam().par_rsdc == undefined
            ? "Mensaje sin definir"
            : this._sesion.getAeParam().par_rsdc,
          (resp) => {
            this._view.dismiss();
          },
          "alert-nogal",
          false,
          "Recuerde que los avisos se publicarán el día viernes de cada semana."
        );
      }
    });
  }
  updateClassified(){
    console.log(this.classified);
    this.sending=true;
    this.classified.cla_foto="";
    this._soclanw.UpdateSoClanw(this.classified).then((resp: transaction) => {
      this.sending = false;
      if (resp != null && resp.Retorno == 0) {
        this._general.showCustomAlert(
          "¡Hemos recibido la solicitud de su clasificado!",
          this._sesion.getAeParam().par_rsdc == undefined
            ? "Mensaje sin definir"
            : this._sesion.getAeParam().par_rsdc,
          (resp) => {
            this._view.dismiss();
          },
          "alert-nogal",
          false,
          "Recuerde que los avisos se publicarán el día viernes de cada semana."
        );
      }
    });
    

  }



  closeModal() {
    this._view.dismiss();
  }
}