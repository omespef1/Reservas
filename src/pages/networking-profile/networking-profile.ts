import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ModalController,
  Modal
} from "ionic-angular";
import { SopernwProvider } from "../../providers/sopernw/sopernw";
import { sessions } from "../../class/sessions/sessions";
import {
  sopernw,
  user,
  transaction,
  sodpern,
  item,
  radio
} from "../../class/models/models";
import { NetworkingMenuPage } from "../networking-menu/networking-menu";
import { NetworkingEditTextPage } from "../networking-edit-text/networking-edit-text";
import { general } from "../../class/general/general";
import { NetworkingProfileProyectPage } from "../networking-profile-proyect/networking-profile-proyect";
import { PartnerProvider } from "../../providers/partner/partner";

/**
 * Generated class for the NetworkingProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-networking-profile",
  templateUrl: "networking-profile.html"
})
export class NetworkingProfilePage {
  myProfileMode = true;
  hasEdited = false;
  economicSectors: item[] = [];
  professions: item[] = [];
  saving = false;
  foto: string = "";
  myProfile:any= {};
  loadingProfile = true;
  user: user = new user();
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private _sopernw: SopernwProvider,
    private _sessions: sessions,
    private _modal: ModalController,
    private _general: general,
    private _sosocio: PartnerProvider
  ) {}

  ionViewDidLoad() {
    this.LoadInitialData();
  }

  async LoadInitialData() {
    this.myProfileMode =this.navParams.get("myProfile") == undefined ? true : false;
    if(this.myProfileMode)
    this.user = await (<any>this._sessions.GetLoggedin());
    else {

     this.myProfile = this.navParams.get('profile');
    }
  
    console.log(this.myProfile);
      this.GetProfessions();
      this.GetSectors();
      if(this.myProfileMode){
        this.GetSoPernw();
        this.GetSocPhoto();
      }
    
      if(!this.myProfileMode){
        this.GetSoPernwOtherProfile();
          this.GetSocPhotoOtherProfile();
      }
      
    
    
  }

  GetSocPhoto() {
    this._sosocio
      .GetSoSocioPhoto(
        this._sessions.GetClientEmpCodi(),
        this.user.Soc_cont,
        this.user.Sbe_cont,
        this.user.Mac_nume1
      )
      .then((resp: transaction) => {
        if (resp != null && resp.Retorno == 0) {
          this.foto = resp.ObjTransaction;
        }
      });
  }

  GetSocPhotoOtherProfile() {
    this._sosocio
      .GetSoSocioPhoto(
        this._sessions.GetClientEmpCodi(),
        this.myProfile.soc_cont,
        this.myProfile.sbe_cont,
        this.myProfile.mac_nume
      )
      .then((resp: transaction) => {
        if (resp != null && resp.Retorno == 0) {
          this.foto = resp.ObjTransaction;
        }
      });
  }


  GetSoPernw() {
    console.log(this.user);
    this._sopernw
      .GetSoPernw(
        this._sessions.GetClientEmpCodi(),
        this.user.Sbe_cont,
        this.user.Soc_cont,
        this.user.Mac_nume1
      )
      .then((resp: transaction) => {
        this.loadingProfile = false;

        if (resp != null && resp.Retorno == 0) {
          this.myProfile = resp.ObjTransaction;
        }
      });
  }


  GetSoPernwOtherProfile() {
    console.log(this.myProfile);
    this._sopernw
      .GetSoPernw(
        this._sessions.GetClientEmpCodi(),
        this.myProfile.sbe_cont,
        this.myProfile.soc_cont,
        this.myProfile.mac_nume
      )
      .then((resp: transaction) => {
        this.loadingProfile = false;

        if (resp != null && resp.Retorno == 0) {
          this.myProfile = resp.ObjTransaction;
        }
      });
  }

  goHome() {
    this.navCtrl.setRoot(NetworkingMenuPage);
  }
  goEditAbout() {
    this.showModalEdit("Acerca de mí", this.myProfile.per_admi, (data: any) => {
      if (data) {
        //Variable para saber si el usuario cambió información
        this.hasEdited = true;
        this.myProfile.per_admi = data.editText;
      }
    });
  }

  goEditTags() {
    // this.showModalEdit("Palabras clave", this.myProfile.per_tags, (data: any) => {
    //   if (data) {
    //     //Variable para saber si el usuario cambió información
    //     this.hasEdited = true;
    //     this.myProfile.per_tags = data.editText;
    //   }
    // });
    let options: any[] = [];

    options.push({
      type: "input",
      label: "Palabras clave",
      value: this.myProfile.per_tags,
      placeholder: "Palabras clave",
      min: 0,
      max: 100
    });
    this._general.showCustomAlertInputs(
      "Años de experiencia",
      options,
      (resp: any) => {
        console.log(resp);

        this.myProfile.per_tags = resp[0];
      },
      "alert-nogal",
      "",
      'Con estas palabras los otros socios podrás encontrarte en la sección "Lo que busco". Usa palabras separadas por una coma.'
    );
  }

  addOrEditProyect(proyect?: sodpern) {
    // this.showModalEdit(proyect.dpe_npro, proyect.dpe_desc, (data: any) => {
    //   if (data) {
    //     //Variable para saber si el usuario cambió información
    //     this.hasEdited = true;
    //     proyect.dpe_desc = data.editText;
    //   }
    // });
    let modal: Modal;
    if (proyect == undefined) {
      let newProyect = new sodpern();

      newProyect.emp_codi = this._sessions.GetClientEmpCodi();
      newProyect.per_cont = this.myProfile.per_cont;
      modal = this._modal.create(NetworkingProfileProyectPage, {
        proyect: newProyect
      });
    } else
      modal = this._modal.create(NetworkingProfileProyectPage, {
        proyect: proyect
      });
    modal.present();
    modal.onDidDismiss((proyectEdit: sodpern) => {
      if (proyect == undefined && proyectEdit)
        this.myProfile.details.push(proyectEdit);
      else {
        proyect = proyectEdit;
      }
    });
  }

  showModalEdit(
    title: string,
    editText: string,
    callback: (data: any) => void
  ) {
    let params: any = { title: title, editText: editText };
    let modal = this._modal.create(NetworkingEditTextPage, params);
    modal.present();
    modal.onDidDismiss(callback);
  }

  GetProfessions() {
    this._sessions.getProfessions().then((resp: item[]) => {
      if (resp) {
        this.professions = resp;
      }
    });
  }

  GetSectors() {
    this._sessions.getEconomicSector().then((resp: item[]) => {
      if (resp) {
        this.economicSectors = resp;
      }
      //codigo de testeo
    });
  }

  setSector() {
    let options: radio[] = [];

    for (let item of this.economicSectors) {
      options.push({
        type: "radio",
        label: item.Ite_nomb,
        value: item.Ite_cont.toString(),
        checked: false
      });
    }
    this._general.showCustomAlertInputs(
      "Sector económico",
      options,
      (resp: any) => {
        console.log(resp);

        this.myProfile.ite_seco = resp;
      },
      "alert-nogal"
    );
  }

  getSectorName() {
    let data = this.economicSectors.filter(
      t => t.Ite_cont == this.myProfile.ite_seco
    )[0];
    return data == undefined ? "Sin definir" : data.Ite_nomb;
  }

  setProfession() {
    let options: radio[] = [];

    for (let item of this.professions) {
      options.push({
        type: "radio",
        label: item.Ite_nomb,
        value: item.Ite_cont.toString(),
        checked: false
      });
    }
    this._general.showCustomAlertInputs(
      "Profesión",
      options,
      (resp: any) => {
        console.log(resp);

        this.myProfile.ite_prof = resp;
      },
      "alert-nogal"
    );
  }

  getProfession() {
    let data = this.professions.filter(
      t => t.Ite_cont == this.myProfile.ite_prof
    )[0];
    return data == undefined ? "Sin Definir" : data.Ite_nomb;
  }

  saveChanges() {
    this.saving = true;
    if (this.myProfile.per_cont == 0) {
      this._sopernw.SetSoPernw(this.myProfile).then((resp: transaction) => {
        this.saving = false;
        if (resp != null && resp.Retorno == 0) {
          this.ShowMessageDone();
        }
      }),
        err => {
          this.saving = false;
        };
    } else {
      this._sopernw.UpdateSoPernw(this.myProfile).then((resp: transaction) => {
        this.saving = false;
        if (resp != null && resp.Retorno == 0) {
          this.ShowMessageDone();
        }
      });
    }
  }

  ShowMessageDone() {
    this._general.showCustomAlert(
      "Hecho!",
      "",
      () => {},
      "alert-nogal",
      false,
      "Cambios guardados! Los cambios que hayas hecho serán visibles para los demás socios cuando tu perfil sea aprobado."
    );
  }

  SetPerAexp() {
    let options: any[] = [];

    options.push({
      type: "input",
      label: "Años de experiencia",
      value: this.myProfile.per_aexp.toString(),
      placeholder: "Años de experiencia",
      min: 0,
      max: 2
    });
    this._general.showCustomAlertInputs(
      "Años de experiencia",
      options,
      (resp: any) => {
        console.log(resp);

        this.myProfile.per_aexp = resp[0];
      },
      "alert-nogal"
    );
  }
}
