import { Component, OnInit } from '@angular/core';
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
import { general } from '../../class/general/general';
import { NotificationsPushProvider } from '../../providers/notifications-push/notifications-push';
import { Platform } from 'ionic-angular';
import { MenuPage } from "../menu/menu";

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
export class NetworkingMenuPage implements OnInit {
  
  user: user= new user();
  params: ae_param;
  myProfile:sopernw = new sopernw();
  loading=true;
  professions: item[] = [];
  foto:string="";
  loadingBanner=false;
  banners:agreement[]=[];
  professionName:string="Sin definir";
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
    private _auth:FirebaseAuthProvider,
    private _general:general,
    private _platform : Platform
  ) {
   
  }


  ngOnInit(){
   
    this.params = this._sesions.getAeParam();
    this._sesions.GetLoggedin().then((resp: user) => {
   
      this.user = resp;
      this.VerifyTerms();
      console.log('usuario es ', this.user);
      
      this.GetSoPernw();
     
    this.GetBanners();
   
  
    });
    console.log('leyendo terminos')
    let tabs = document.querySelectorAll('.tabs-ios .tabbar');
    if (tabs !== null) {
        Object.keys(tabs).map((key) => {
            tabs[key].style.display = 'none';
        });
    }
  }
goMenu(){
  this.navCtrl.setRoot(MenuPage);
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
   // let accepted: any = await (<any>this._sesions.getAcceptedTerms());
  
      this._aeinapp
        .ExistsAeInapp(
          this._sessions.GetClientEmpCodi(),
          this.user.Soc_cont,
          this.user.Sbe_cont,
          this.user.Mac_nume1
        )
        .then((request: transactionNumber) => {
          if (request.Retorno == 0 && request.number == 0) {
            this.showModalTerms();
          }
        });
    
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

  async GetSoPernw() {
    console.log(this.user);
    this._sopernw
      .GetSoPernw(
       await this._sessions.getEmpCodiSession(),
        this.user.Sbe_cont,
        this.user.Soc_cont,
        this.user.Mac_nume1
      )
      .then((resp: transaction) => {
        this.loading = false;

        if (resp != null && resp.ObjTransaction != null && resp.Retorno==0) {
        
          this.myProfile = resp.ObjTransaction;
          this._sesions.SetNetworkingUser(this.myProfile);
          this.LoginFirebase();
          this.GetPhoto();
          this.GetProfessions();
        }
        else
        this._general.showCustomAlert('Atención!','Para acceder a las funciones de Nogal Conecta debes completar tu perfil.',()=>{
          this.navCtrl.push(NetworkingProfilePage)
        },'alert-nogal',false,'');
      });
  }

  // async GetSocPhoto(){
  //   this._sosocio.GetSoSocioPhoto(await this._sessions.getEmpCodiSession(),
  //   this.user.Soc_cont,this.user.Sbe_cont,this.user.Mac_nume1).then((resp:transaction)=>{
  //     if(resp!=null && resp.Retorno==0){
  //          this.foto = resp.ObjTransaction;
  //     }
  //   })
  // }

  async GetPhoto(){
    this._sopernw.GetPhoto(await this._sessions.getEmpCodiSession(),this.myProfile.per_cont).then((resp:transaction)=>{
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
        this.FindProfession();
      }
    });
  }

  FindProfession() {
    
     this.professionName = this._sesions.FindProfessions(this.professions,this.myProfile.ite_prof);
    
  }

  goFavorites(){
    this.navCtrl.setRoot(NetworkingFavoritesPage);
  }

  goBusinessArea(){
    this.navCtrl.setRoot(NetworkingBusinessAreaPage);
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

  async LoginFirebase(){
    let oneSignalData:any= { userId:""}
    console.log(this._auth.user==null);
    if(this._platform.is("cordova")){
      oneSignalData= await this._sesions.getOneSignalIds();
    }   
      this._auth.loginWithMail(this.user.Sbe_mail,"123456",`${this.user.Soc_nomb} ${this.user.Soc_apel}`,oneSignalData.userId,this.myProfile.emp_codi,this.myProfile.per_cont); 
        
  }
  setDonations(){
    this._general.showCustomAlert('¡Quiero apoyar Networking!',
    'Los aportes voluntarios de los socios del Club El Nogal permiten mejorar esta plataforma de networking.',()=>{this.goDonations()},'alert-nogal',false,'');
  }

goDonations(){
 let url = this._sessions.getUrlDonations();
 if(url=="")
 this._general.showToastMessage('Funcionalidad no activada. Consulte con su administrador del sistema','bottom');
 else
  this._general.openUrl(url);
}
ngAfterViewInit() {
 
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
