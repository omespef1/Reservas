import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ModalController,
} from "ionic-angular";
import { SopernwProvider } from "../../providers/sopernw/sopernw";
import { sessions } from "../../class/sessions/sessions";
import {
  sopernw,
  user,
  transaction,
  sodpern,
  item,
  radio,
} from "../../class/models/models";
import { NetworkingMenuPage } from "../networking-menu/networking-menu";
import { NetworkingEditTextPage } from "../networking-edit-text/networking-edit-text";
import { general } from "../../class/general/general";

/**
 * Generated class for the NetworkingProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-networking-profile",
  templateUrl: "networking-profile.html",
})
export class NetworkingProfilePage {
  myProfileMode = true;
  hasEdited = false;
  economicSectors: item[] = [];
  professions: item[] = [];
  saving = false;
  myProfile = new sopernw();
  // myProfile: sopernw = {
  //   emp_codi: 102,
  //   per_cont: 1,
  //   soc_cont: 39,
  //   sbe_cont: 1,
  //   mac_nume: "3023",
  //   ite_prof: 14567,
  //   ite_seco: 14978,
  //   per_aexp: 0,
  //   per_admi:
  //     "soy ingenero de sistemas con mas de 20 años de experiencia en proyectos informaticos",
  //   per_foto: ["string"],
  //   per_tags: "string",
  //   per_esta: "A",
  //   cas_cont: 0,
  //   aud_ufac: new Date(),
  //   aud_usua: "string",
  //   aud_esta: "string",
  //   details: [
  //     {
  //       emp_codi: 0,
  //       per_cont: 0,
  //       dpe_proy: 0,
  //       dpe_npro: "Digitalware S.A",
  //       dpe_desc:
  //         "Empresa del sector de tecnología especializada en Software ERP, Software de Nómina y Gestión Humana y Software para IPS y Clínicas, con más de 25 años en el mercado, líder en diseño e implantación de soluciones empresariales en las áreas de RRHH, Finanzas, Logística, Manufactura, Seguridad, Petróleos, Energía, Cajas de Compensación, Gobierno, Educación y Salud.",
  //       dpe_fpro: ["string"],
  //       cas_cont: 0,
  //       aud_ufac: new Date(),
  //       aud_usua: "string",
  //       aud_esta: "string",
  //     },
  //     {
  //       emp_codi: 0,
  //       per_cont: 0,
  //       dpe_proy: 0,
  //       dpe_npro: "Facebook",
  //       dpe_desc:
  //         "compañía estadounidense que ofrece servicios de redes sociales y medios sociales en línea con sede en Menlo Park, California. Su sitio web fue lanzado el 4 de febrero de 2004 por Mark Zuckerberg, junto con otros estudiantes de la Universidad de Harvard y compañeros de habitación, Eduardo Saverin, Andrew McCollum, Dustin Moskovitz y Chris Hughes. Está disponible en español desde febrero de 2008.4​ Facebook es una plataforma que funciona sobre una infraestructura de computación basada principal y totalmente en sistemas GNU/Linux, usando el conjunto de tecnologías LAMP, entre otras.",
  //       dpe_fpro: ["string"],
  //       cas_cont: 0,
  //       aud_ufac: new Date(),
  //       aud_usua: "string",
  //       aud_esta: "string",
  //     },
  //   ],
  // };
  loadingProfile = true;
  user: user= new user();
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private _sopernw: SopernwProvider,
    private _sessions: sessions,
    private _modal: ModalController,
    private _general: general
  ) {
   
  }

  ionViewDidLoad() {
    this.LoadInitialData();
  }

  async LoadInitialData() {
  this.user =     await<any>  this._sessions.GetLoggedin();
    console.log(user);
    this.myProfileMode =
      this.navParams.get("myProfile") == undefined ? true : false;
    if (this.myProfileMode) {
      this.GetProfessions();
      this.GetSectors();
      this.GetSoPernw();
    }
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

  goEditProyect(proyect: sodpern) {
    this.showModalEdit(proyect.dpe_npro, proyect.dpe_desc, (data: any) => {
      if (data) {
        //Variable para saber si el usuario cambió información
        this.hasEdited = true;
        proyect.dpe_desc = data.editText;
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
    this.professions = [
      {
        Ite_codi: "0",
        Ite_cont: 14567,
        Ite_nomb: "Presidente y CEO",
        Tit_cont: 0,
      },
      { Ite_codi: "1", Ite_cont: 14568, Ite_nomb: "Arquiteecto", Tit_cont: 0 },
    ];
    this._sessions.getProfessions().then((resp: item[]) => {
      if (resp) {
        this.professions = resp;
      }
    });
  }

  GetSectors() {
    this.economicSectors = [
      { Ite_codi: "0", Ite_cont: 14978, Ite_nomb: "Software", Tit_cont: 0 },
      { Ite_codi: "1", Ite_cont: 14979, Ite_nomb: "Automotri", Tit_cont: 0 },
    ];
    this._sessions.getEconomicSector().then((resp: item[]) => {
      if (resp) {
        // this.economicSectors = resp;
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
        checked: false,
      });
    }
    this._general.showRadio("Sector económico", options, (resp: any) => {
      console.log(resp);

      this.myProfile.ite_seco = resp;
    });
  }

  getSectorName() {
    let data = this.economicSectors.filter(
      (t) => t.Ite_cont == this.myProfile.ite_seco
    )[0];
    return data == undefined ? "" : data.Ite_nomb;
  }

  setProfession() {
    let options: radio[] = [];

    for (let item of this.professions) {
      options.push({
        type: "radio",
        label: item.Ite_nomb,
        value: item.Ite_cont.toString(),
        checked: false,
      });
    }
    this._general.showRadio("Profesión", options, (resp: any) => {
      console.log(resp);

      this.myProfile.ite_prof = resp;
    });
  }

  getProfession() {
    let data = this.professions.filter(
      (t) => t.Ite_cont == this.myProfile.ite_prof
    )[0];
    return data == undefined ? "" : data.Ite_nomb;
  }

  saveChanges() {
    this.saving = true;
    if (this.myProfile.per_cont == 0) {
      this._sopernw.SetSoPernw(this.myProfile).then((resp: transaction) => {
        this.saving = false;
        if (resp != null && resp.Retorno == 0) {
          this.ShowMessageDone();
        }
      }     
    ),err=>{
      this.saving=false;
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
      "Cambios guardados!"
    );
  }
}
