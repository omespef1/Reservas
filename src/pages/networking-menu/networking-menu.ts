import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ModalController,
} from "ionic-angular";
import { transactionNumber, user, ae_param, transaction, sopernw, item, agreement } from "../../class/models/models";
import { AeinappProvider } from "../../providers/aeinapp/aeinapp";
import { sessions } from "../../class/sessions/sessions";
import { NetworkingTermsPage } from "../networking-terms/networking-terms";
import { NetworkingSearchPage } from "../networking-search/networking-search";
import { NetworkingProfilePage } from "../networking-profile/networking-profile";
import { NetworkingMessagesPage } from "../networking-messages/networking-messages";
import { NetworkingClassifiedsPage } from "../networking-classifieds/networking-classifieds";
import { NetworkingNewsPage } from "../networking-news/networking-news";
import { SopernwProvider } from "../../providers/sopernw/sopernw";
import { PartnerProvider } from "../../providers/partner/partner";
import { NetworkingFavoritesPage } from "../networking-favorites/networking-favorites";
import { NetworkingBusinessAreaPage } from '../networking-business-area/networking-business-area';
import { PqrPage } from '../pqr/pqr';
import { AgreementsProvider } from '../../providers/agreements/agreements';
import { FirebaseAuthProvider } from '../../providers/firebase-auth/firebase-auth';

/**
 * Generated class for the NetworkingMenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-networking-menu",
  templateUrl: "networking-menu.html",
})
export class NetworkingMenuPage {
  user: user= new user();
  params: ae_param;
  myProfile:sopernw = new sopernw();
  loading=true;
  professions: item[] = [];
  foto:string="";
  loadingBanner=false;
  banners:agreement[]=[];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private _aeinapp: AeinappProvider,
    private _sesions: sessions,
    private _modal: ModalController,
    private _sopernw:SopernwProvider,
    private _sessions:sessions,
    private _sosocio:PartnerProvider,
    private _agrrements:AgreementsProvider,
    private _auth:FirebaseAuthProvider
  ) {
    this.params = this._sesions.getAeParam();
    this._sesions.GetLoggedin().then((resp: user) => {
      this.user = resp;
      this.GetProfessions();
      this.GetSoPernw();
      this.GetSocPhoto();
      this.GetBanners();
      this.LoginFirebase();
    });
  }

  ionViewDidLoad() {
    this.VerifyTerms();
   
  }

  showModalTerms() {
    let modal = this._modal.create(NetworkingTermsPage);
    modal.present();
  }

  goNetworkingSearch() {
    this.navCtrl.setRoot(NetworkingSearchPage);
  }

  async VerifyTerms() {
    //revisamos si en sesión ya sabemos que el usuario aceptó términos
    //si no, vamos a la base de datos a ver si hay registro de aceptación de términos
    let accepted: any = await (<any>this._sesions.getAcceptedTerms());
    console.log(accepted)
    if (accepted==null) {
      this._aeinapp
        .ExistsAeInapp(
          this.user.Emp_codi,
          this.user.Soc_cont,
          this.user.Sbe_cont,
          this.user.Mac_nume
        )
        .then((request: transactionNumber) => {
          if (request.Retorno == 0 && request.number == 0) {
            this.showModalTerms();
          }
        });
    }
  }

  goProfile() {
    this.navCtrl.setRoot(NetworkingProfilePage);
  }

  goMessages() {
    this.navCtrl.setRoot(NetworkingMessagesPage);
  }
  goClassifieds() {
    this.navCtrl.setRoot(NetworkingClassifiedsPage);
  }
  goNews(){
    this.navCtrl.setRoot(NetworkingNewsPage);
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
        this.loading = false;

        if (resp != null && resp.Retorno == 0) {
          this.myProfile = resp.ObjTransaction;
          this._sesions.SetNetworkingUser(this.myProfile);
        }
      });
  }

  GetSocPhoto(){
    this._sosocio.GetSoSocioPhoto(this._sessions.GetClientEmpCodi(),
    this.user.Soc_cont,this.user.Sbe_cont,this.user.Mac_nume1).then((resp:transaction)=>{
      if(resp!=null && resp.Retorno==0){
           this.foto = resp.ObjTransaction;
      }
    })
  }

  GetProfessions() {
    // this.professions = [
    //   {
    //     Ite_codi: "0",
    //     Ite_cont: 14567,
    //     Ite_nomb: "Presidente y CEO",
    //     Tit_cont: 0,
    //   },
    //   { Ite_codi: "1", Ite_cont: 14568, Ite_nomb: "Arquiteecto", Tit_cont: 0 },
    // ];
    this._sessions.getProfessions().then((resp: item[]) => {
      if (resp) {
        this.professions = resp;
      }
    });
  }

  FindProfession() {
    console.log(this.myProfile);
    if(this.myProfile){
      let data = this.professions.filter(
        (t) => t.Ite_cont == this.myProfile.ite_prof
      )[0];
      return data == undefined ? "Sin Definir" : data.Ite_nomb;
    }
   return "Sin definir";
  }

  goFavorites(){
    this.navCtrl.push(NetworkingFavoritesPage);
  }

  goBusinessArea(){
    this.navCtrl.push(NetworkingBusinessAreaPage);
  }

  goPqr(){
    this.navCtrl.setRoot(PqrPage);
  }


  GetBanners(){
    this.loadingBanner=true;
    this._agrrements.GetBanners().then((resp:transaction)=>{
      this.loadingBanner=false;
      if(resp!=null && resp.Retorno==0){
        console.log(resp);
        this.banners = resp.ObjTransaction;
      }
    })
  }


  LoginFirebase(){
    console.log(this.user);
    this._auth.loginWithMail(this.user.Sbe_mail,this.user.sbe_pass).then((resp=>{
      console.log(resp);
  
    })).catch( (err:any)=> {   
       if(err.code =="auth/user-not-found"){
        console.log("Usuario de chat no creado.Creando...");
        this._auth.signInWithMail(this.user.Sbe_mail,"950501").then(resp=>{
          if(resp){
            console.log("Usuario logueado con éxito");
            this._auth.updateUser(`${this.user.Soc_nomb} ${this.user.Soc_apel}`)
          }
        })
       }
     })
  }

  // GetBanners(){
  //   this.loadingBanner=true;
  //   this._agrrements.GetBanners().then((resp:transaction)=>{
  //     this.loadingBanner=false;
  //     if(resp.Retorno==0){
  //       console.log(resp);
  //       this.banners = resp.ObjTransaction;
  //     }
  //   })
  // }
}
