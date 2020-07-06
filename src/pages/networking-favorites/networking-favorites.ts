import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams, AlertOptions } from "ionic-angular";
import { sessions } from "../../class/sessions/sessions";
import { SofanetProvider } from "../../providers/sofanet/sofanet";
import { NetworkingMenuPage } from "../networking-menu/networking-menu";
import { NetworkingProfilePage } from "../networking-profile/networking-profile";
import { transaction, item } from '../../class/Models/models';
import { general } from "../../class/general/general";

/**
 * Generated class for the NetworkingFavoritesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-networking-favorites",
  templateUrl: "networking-favorites.html",
})
export class NetworkingFavoritesPage {
  favorites: any[] = [];
  favoritesFilter: any[] = [];
  loading = false;
  professions:item[]=[];
  filter: string = "O";
  optionsSheet: AlertOptions = { cssClass: "alert-nogal" };

  options: any[] = [
    { text: "Orden alfabético", value: "O" },
    { text: "Agregados recientemente", value: "A" },
    { text: "Más Experiencia", value: "M" },
    { text: "Menos experiencia", value: "E" },
   
  ];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private _sesion: sessions,
    private _sofanet: SofanetProvider,
    private _general: general
  ) {}

 async ionViewDidLoad() {
   this.professions = await this._sesion.getProfessions();
    this.GetSoFanet();
  }



  goHome() {
    this.navCtrl.setRoot(NetworkingMenuPage);
  }
  GetSoFanet() {
    this, (this.loading = true);
    this._sesion.GetNetworkingUser().then((netUser) => {
      this.loading = false;
      this._sofanet
        .GetSoFanet(this._sesion.GetClientEmpCodi(), netUser.per_cont)
        .then((resp: transaction) => {
          if (resp != null && resp.Retorno == 0) {
            this.favorites = resp.ObjTransaction;
            this.favoritesFilter = resp.ObjTransaction;
          }
        });
    });
  }

  goOtherProfile(profile: any) {
    this.navCtrl.push(NetworkingProfilePage, {
      myProfile: false,
      profile: profile,
    });
  }

   GetProfession(profile) {
   
    console.log(this.professions);
    console.log(profile);
    if (profile != undefined) {
      let data = this.professions.filter(
        (t) => t.Ite_cont == profile.ite_prof
      )[0];
      return data == undefined ? "Sin Definir" : data.Ite_nomb;
    }
  }

  initializeItems() {
    this.favoritesFilter = this.favorites;
  }

  SearchFavorites(q: string) {
    //Reseteo los items a su estado original
    this.initializeItems();
    //Si el valor es vacío no filtra ndada
    if (!q || q.trim() === "") {
      return;
    }
    //Realiza el filtrado
    this.favoritesFilter = this.favorites.filter(
      (v) =>
        v.sbe_nomb.toString().indexOf(q.toString()) > -1 ||
        v.sbe_apel.toString().indexOf(q.toLowerCase()) > -1
    );
  }

  showConfirmDelete(profile: any) {
    this._general.showCustomAlert(
      "Borrar favorito",
      "",
      () => {
        this.DeleteSoFanet(profile);
      },
      "alert-nogal",
      false,
      "¿Se borrará el favorito, continuar?"
    );
  }

  async DeleteSoFanet(profile: any) {
    const index = this.favorites.indexOf(profile, 0);
    this._sofanet
      .deleteSoFanet(this._sesion.GetClientEmpCodi(), profile.fan_cont)
      .then((resp: transaction) => {
        if (resp != undefined && resp.Retorno == 0) {
          this.favorites.splice(index, 1);
          this._general.showCustomAlert(
            "Hecho!",
            "",
            () => {},
            "alert-nogal",
            false,
            "El favorito se ha borrado"
          );
          this.initializeItems();
        }
      });
  }
  
}
