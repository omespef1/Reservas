import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams, ViewController } from "ionic-angular";
import { general } from "../../class/general/general";
import { SoclanwProvider } from "../../providers/soclanw/soclanw";
import { soclanw } from "../../class/models/soclanw/soclanw";
import { transaction } from "../../class/models/models";
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
  termsreceived="";
  classified:soclanw= new soclanw();
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private _general: general,
    private _soclanw:SoclanwProvider,
    private _sesion:sessions,
    private _view:ViewController
  ) {
       
  }

  ionViewDidLoad() {
   this.classified = new soclanw();


  }




  SetClassified() {
    this.sending = true;


    this._soclanw.SetSoClanw(this.classified).then((resp:transaction)=>{
      this.sending = false;

      if(resp!=null && resp.Retorno==0){

        this._general.showCustomAlert(
          "¡Hemos recibido la solicitud de su clasificado!",
          this._sesion.getAeParam().par_rsdc,
          (resp) => {
            console.log("cerrando modal");
          },
          "alert-nogal",
          false,
          "Recuerde que los avisos se publicarán el día viernes de cada semana."
        );
      }
     
    })
  
  }

  closeModal(){
  this._view.dismiss();

  }
}
