import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ModalController,
  Modal,
} from "ionic-angular";
import { SopernwProvider } from "../../providers/sopernw/sopernw";
import { sessions } from "../../class/sessions/sessions";
import {
  sopernw,
  user,
  sodpern,
  item,
  radio,
  sofanet,
} from "../../class/models/models";
import { NetworkingMenuPage } from "../networking-menu/networking-menu";
import { NetworkingEditTextPage } from "../networking-edit-text/networking-edit-text";
import { general } from "../../class/general/general";
import { NetworkingProfileProyectPage } from "../networking-profile-proyect/networking-profile-proyect";
import { PartnerProvider } from "../../providers/partner/partner";
import { SofanetProvider } from "../../providers/sofanet/sofanet";
import { SodpernProvider } from "../../providers/sodpern/sodpern";
import { FirebaseAuthProvider } from "../../providers/firebase-auth/firebase-auth";
import { CameraProvider } from "../../providers/camera/camera";
import { transaction } from '../../class/models/models';
import { NetworkingProyectViewerPage } from '../networking-proyect-viewer/networking-proyect-viewer';
import { NetworkingImageViewerPage } from "../networking-image-viewer/networking-image-viewer";
import { NetworkingChatPage } from "../networking-chat/networking-chat";

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
  foto: string = "";
  myProfile: any = {};
  loadingProfile = true;
  user: user = new user();
  hasChangedPhoto: boolean;
  ProfileBd:any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private _sopernw: SopernwProvider,
    private _sessions: sessions,
    private _modal: ModalController,
    private _general: general,
    private _sosocio: PartnerProvider,
    private _sofanet: SofanetProvider,
    private _sodpern: SodpernProvider,
    private _auth: FirebaseAuthProvider,
    private camera: CameraProvider
  ) {}

  ionViewDidLoad() {
 
    this.LoadInitialData();
  }

  async LoadInitialData() {
    this.hasChangedPhoto = false;
    this.myProfileMode =
      this.navParams.get("myProfile") == undefined ? true : false;
    if (this.myProfileMode)
      this.user = await (<any>this._sessions.GetLoggedin());
    else {
      this.myProfile = this.navParams.get("profile");
      console.log("el perfil es", this.myProfile);
    }

    console.log(this.myProfile);
    this.GetProfessions();
    this.GetSectors();
    if (this.myProfileMode) {
      this.GetSoPernw();
    }

    if (!this.myProfileMode) {
      this.GetSoPernwOtherProfile();
     this.GetSocPhotoOtherProfile();
    }
  }

  GetSocPhoto() {
    this._sopernw
      .GetPhoto(this.myProfile.emp_codi, this.myProfile.per_cont)
      .then((resp: transaction) => {
        if (resp != null && resp.Retorno == 0) {
          this.foto = resp.ObjTransaction;
        }
      });
  }
  goChat() {
    console.log(this.myProfile);
    if (this.myProfile.per_uuid == undefined || this.myProfile.per_uuid == null) {
      this._general.showCustomAlert(
        "No permitido!",
        "",
        () => {},
        "alert-nogal",
        false,
        "El socio seleccionado aún no ha creado su perfil en nogal-conecta."
      );
    } else {
     
      // this.navCtrl.push(NetworkingChatPage, { 'profile': profile})
      this.navCtrl.push(NetworkingChatPage, {
        profile: {
          per_uuid: this.myProfile.per_uuid,
          sbe_nomb: this.myProfile.sbe_nomb,
          oneSignalId: this.myProfile.per_osid,
        },
      });
    }
  }
  GetSocPhotoOtherProfile() {
    // this._sopernw
    //   .GetPhoto(this.myProfile.emp_codi, this.myProfile.per_cont)
    //   .then((resp: transaction) => {
    //     if (resp != null && resp.Retorno == 0) {
    //       this.foto = resp.ObjTransaction;
    //     }
    //   });
    this.foto = this.myProfile.per_foto;
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
          console.log(this.myProfile);
          if (this.myProfile == null) {
            this.myProfile = new sopernw();
            this.myProfile.details = [];
          } else {
            this.GetSocPhoto();
          }
          this.myProfile.mac_nume = this.user.Mac_nume1;
          this.myProfile.sbe_cont = this.user.Sbe_cont;
          this.myProfile.soc_cont = this.user.Soc_cont;
          this.myProfile.emp_codi = this._sessions.GetClientEmpCodi();
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
          this.myProfile.details = resp.ObjTransaction.details;
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
    let options: any[] = [];
    options.push({
      type: "input",
      label: "Palabras clave",
      value: this.myProfile.per_tags,
      placeholder: "Palabras clave",
      min: 0,
      max: 100,
    });
    this._general.showCustomAlertInputs(
      "Palabras clave",
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
    let modal: Modal;
    if (proyect == undefined) {
      let newProyect = new sodpern();

      newProyect.emp_codi = this._sessions.GetClientEmpCodi();
      newProyect.per_cont = this.myProfile.per_cont;
      modal = this._modal.create(NetworkingProfileProyectPage, {
        proyect: newProyect,
      });
    } else
      modal = this._modal.create(NetworkingProfileProyectPage, {
        proyect: proyect,
      });
    modal.present();
    modal.onDidDismiss((proyectEdit: sodpern) => {
      if (proyect == undefined && proyectEdit) {
        if (this.myProfile.details == null) {
          this.myProfile.details = [];
        }
        this.myProfile.details.push(proyectEdit);
      } else {
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
    if (this.myProfile != null && this.myProfile.ite_seco != null) {
      let data = this.economicSectors.filter(
        (t) => t.Ite_cont == this.myProfile.ite_seco
      )[0];
      return data == undefined ? "Sin definir" : data.Ite_nomb;
    }
    return "Sin definir";
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
    if (this.myProfile != null && this.myProfile.ite_prof != null) {
      let data = this.professions.filter(
        (t) => t.Ite_cont == this.myProfile.ite_prof
      )[0];
      return data == undefined ? "Sin Definir" : data.Ite_nomb;
    }
    return "Sin Definir";
  }

  saveChanges() {
    this.saving = true;
   // this.myProfile.per_uuid = this._auth.user.uid;
    if (this.myProfile.per_cont == undefined || this.myProfile.per_cont == 0) {
      this._sopernw.SetSoPernw(this.myProfile).then((resp: transaction) => {
        this.saving = false;
        if (resp != null && resp.Retorno == 0) {
          this.ShowMessageDone();
          this._sopernw
            .GetSoPernw(
              this._sessions.GetClientEmpCodi(),
              this.user.Sbe_cont,
              this.user.Soc_cont,
              this.user.Mac_nume1
            )
            .then((profileCreated: transaction) => {  
              this.ProfileBd = profileCreated;                          
              if (this.hasChangedPhoto) {
                if (this.ProfileBd != null && this.ProfileBd.Retorno == 0) {
                  this._sopernw.updatePhoto({
                    emp_codi: this._sessions.GetClientEmpCodi(),
                    per_cont: this.ProfileBd.ObjTransaction.per_cont,
                    per_foto: this.foto,
                  }).then(()=>{
                    console.log('photo actualizada');
                  })
                }
              }
                
              for(let detail of this.myProfile.details){
                  this._sodpern.UpdateSoDpernPhoto({ emp_codi:this.ProfileBd.ObjTransaction.emp_codi,per_cont:this.ProfileBd.ObjTransaction.per_cont,dpe_fpro : detail.dpe_fpro,dpe_proy:detail.dpe_proy}).then(()=>{
                    console.log('detalle foto actualizada');
                  })


              }
            });
        }
      }),
        (err) => {
          this.saving = false;
        };
    } else {
      this._sopernw.UpdateSoPernw(this.myProfile).then((resp: transaction) => {
        this.saving = false;
        if (this.hasChangedPhoto) {
          if (resp != null && resp.Retorno == 0) {
            this._sopernw.updatePhoto({
              emp_codi: this.myProfile.emp_codi,
              per_cont: this.myProfile.per_cont,
              per_foto: this.foto,
            });
          
          }
        }

        this._sopernw
        .GetSoPernw(
          this._sessions.GetClientEmpCodi(),
          this.user.Sbe_cont,
          this.user.Soc_cont,
          this.user.Mac_nume1
        ).then((profile:transaction)=>{
          this.ProfileBd = profile;
          for(let detail of this.myProfile.details){
            this._sodpern.UpdateSoDpernPhoto({ emp_codi:this.ProfileBd.ObjTransaction.emp_codi,per_cont:this.ProfileBd.ObjTransaction.per_cont,dpe_fpro : detail.dpe_fpro,dpe_proy:detail.dpe_proy}).then(()=>{
              console.log('detalle foto actualizada');
            })
          }
        })
        
        this.ShowMessageDone();
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
      value:
        this.myProfile.per_aexp == undefined
          ? "0"
          : this.myProfile.per_aexp.toString(),
      placeholder: "Años de experiencia",
      min: 0,
      max: 2,
    });
    this._general.showCustomAlertInputs(
      "Años de experiencia",
      options,
      (resp: any) => {
        console.log(resp);
        if ((this.myProfile.per_aexp = resp[0] < 0)) {
          this._general.showToastMessage(
            "Años de experiencia no puede ser un valor negativo",
            "bottom"
          );
          this.myProfile.per_aexp = 0;
        } else this.myProfile.per_aexp = resp[0];
      },
      "alert-nogal"
    );
  }

  async addToFavorites() {
    let favorite: sofanet = {
      emp_codi: this._sessions.GetClientEmpCodi(),
      emp_codf: this._sessions.GetClientEmpCodi(),
      per_cont: (await this._sessions.GetNetworkingUser()).per_cont,
      per_conf: this.myProfile.per_cont,
      fan_cont: 0,
      aud_esta: "A",
      aud_ufac: new Date(),
      aud_usua: "",
    };
    this._sofanet.SetSoFanet(favorite).then((resp: transaction) => {
      if (resp != undefined && resp.Retorno == 0) {
        this._general.showCustomAlert(
          "Hecho!",
          "",
          () => {},
          "alert-nogal",
          false,
          "Favorito guardado!"
        );
      }
    });
  }

  deleteProyect(proyect: sodpern) {
    if (proyect.dpe_proy > 0) {
      this._general.showCustomAlert(
        "Borrar proyecto?",
        "¿Estás seguro?, esta operación no puede deshacerse",
        () => {
          this._sodpern
            .deleteSoDpern(this._sessions.GetClientEmpCodi(), proyect.dpe_proy)
            .then((resp: transaction) => {
              if (resp != null && resp.Retorno == 0) {
                let proyects: sodpern[] = this.myProfile.details;
                const index = proyects.indexOf(proyect);
                proyects.splice(index, 1);
                this._general.showToastMessage("Proyecto borrado!", "bottom");
              }             
            });
        },
        "alert-nogal",
        false
      );
    } else {
      let proyects: sodpern[] = this.myProfile.details;
      const index = proyects.indexOf(proyect);
      proyects.splice(index, 1);
      this._general.showToastMessage("Proyecto borrado!", "bottom");
    }
  }

  loadCamera() {
    this.camera.openeditprofile().then((resp: string) => {
      this.foto = resp;
      this.hasChangedPhoto = true;
    });
  }

  GoProyect(proyect:any){

    this.navCtrl.push(NetworkingProyectViewerPage, { 'proyect':proyect});
  }

  viewImage(data){
    this.navCtrl.push(NetworkingImageViewerPage, { 'image':data})
  }
}
