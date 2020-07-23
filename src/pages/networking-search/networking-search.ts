import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  AlertOptions,
} from "ionic-angular";
import { NetworkingMenuPage } from "../networking-menu/networking-menu";
import { NetworkingProfilePage } from "../networking-profile/networking-profile";
import { SopernwProvider } from "../../providers/sopernw/sopernw";
import { sessions } from "../../class/sessions/sessions";
import {
  transaction,
  item,
  sofanet,
} from "../../class/models/models";
import { SofanetProvider } from "../../providers/sofanet/sofanet";
import { general } from "../../class/general/general";
import { NetworkingChatPage } from "../networking-chat/networking-chat";

/**
 * Generated class for the NetworkingSearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
enum modeSearchProfile {

  search=1,
  allProfilesApprobed=2 
}
@IonicPage()
@Component({
  selector: "page-networking-search",
  templateUrl: "networking-search.html",
})
export class NetworkingSearchPage {
  searchTerms: string = "";
  economicSectors: item[] = [];
  professions: item[] = [];
  loading = false;
  profiles: any[] = [];
  profilesAll: any[] = [];
  filter: string = "O";
  mode: number;
  optionsSheet: AlertOptions = { cssClass: "alert-nogal" };

  options: any[] = [
    { text: "Orden alfabético", value: "O" },
    { text: "Perfiles recientes", value: "P" },
    { text: "Perfiles antiguos", value: "A" },
    { text: "Más Experiencia", value: "M" },
    { text: "Menos Experiencia", value: "E" },
  ];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private _sopwenw: SopernwProvider,
    private _sofanet: SofanetProvider,
    private _general: general,
    private _session: sessions
  ) {}

  ionViewDidLoad() {
    console.log(this.navParams.get("mode"));
    this.GetProfessions();
    this.mode =
      this.navParams.get("mode") == undefined
        ? modeSearchProfile.search
        : modeSearchProfile.allProfilesApprobed;
console.log(this.mode);
     if(this.mode== modeSearchProfile.allProfilesApprobed)
     this.loadProfiles();   
  }

  getItems() {}

  goHome() {
    this.navCtrl.setRoot(NetworkingMenuPage);
  }
  goOtherProfile(profile: any) {
    this.navCtrl.push(NetworkingProfilePage, {
      myProfile: false,
      profile: profile,
    });
  }

  GetSoPernw() {
    console.log(this.mode);
    switch (this.mode) {
      case modeSearchProfile.search:
       this.loadProfiles();
        break;
      case modeSearchProfile.allProfilesApprobed:
        this.profiles = this.profilesAll;
        this.profiles.filter((v) => v.sbe_nomb);
    }
  }


  loadProfiles(){
    this.loading = true;
    this._sopwenw
      .GeSoPernw(this._session.GetClientEmpCodi(), this.searchTerms)
      .then((resp: transaction) => {
        this.loading = false;
        console.log(resp);
        if (resp != null && resp.Retorno == 0) {
          this.profilesAll = resp.ObjTransaction;
          this.profiles = resp.ObjTransaction;
          this.setFilter(this.filter);
        }
      });
  }
  GetProfessions() {
    this._session.getProfessions().then((resp: item[]) => {
      if (resp) {
        this.professions = resp;
      }
    });
  }

  getProfession(profile: any) {
    let data = this.professions.filter(
      (t) => t.Ite_cont == profile.ite_prof
    )[0];
    return data == undefined ? "Sin Definir" : data.Ite_nomb;
  }

  getSectorName(profile: any) {
    let data = this.economicSectors.filter(
      (t) => t.Ite_cont == profile.ite_seco
    )[0];
    return data == undefined ? "Sin definir" : data.Ite_nomb;
  }

  GetSectors() {
    this._session.getEconomicSector().then((resp: item[]) => {
      if (resp) {
        this.economicSectors = resp;
      }
      //codigo de testeo
    });
  }
  async addToFavorites(profile: any) {
    console.log(profile);
    let favorite: sofanet = {
      emp_codi: this._session.GetClientEmpCodi(),
      emp_codf: this._session.GetClientEmpCodi(),
      per_cont: (await this._session.GetNetworkingUser()).per_cont,
      per_conf: profile.per_cont,
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

  setFilter($event: any) {
    console.log($event);
    console.log(this.profiles);
    switch ($event) {
      case "O":
        this.profiles.sort((a, b) =>
          a.sbe_nomb > b.sbe_nomb ? 1 : b.sbe_nomb > a.sbe_nomb ? -1 : 0
        );
        break;
      case "P":
        this.profiles.sort((a, b) =>
          a.sbe_nomb < b.sbe_nomb ? 1 : b.sbe_nomb < a.sbe_nomb ? -1 : 0
        );
        break;
      case "A":
        this.profiles.sort((a, b) =>
          a.aud_ufac > b.aud_ufac ? 1 : b.aud_ufac > a.aud_ufac ? -1 : 0
        );
        break;
      case "M":
        this.profiles.sort((a, b) =>
          a.per_aexp < b.per_aexp ? 1 : b.per_aexp < a.per_aexp ? -1 : 0
        );
        break;
      case "E":
        this.profiles.sort((a, b) =>
          a.per_aexp > b.per_aexp ? 1 : b.per_aexp > a.per_aexp ? -1 : 0
        );
        break;
      default:
        console.log("default");
    }
  }

  goChat(profile:any){
    if(profile.per_uuid ==undefined || profile.per_uuid ==null){
      this._general.showCustomAlert(
        "No permitido!",
        "",
        () => {},
        "alert-nogal",
        false,
        "El socio seleccionado aún no ha creado su perfil en nogal-conecta."
      );
    }
    else {
      console.log('perfil enviado', profile);
      this.navCtrl.push(NetworkingChatPage, { 'profile': profile})
    }
    

  }
}
