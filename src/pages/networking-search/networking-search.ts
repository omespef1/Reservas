import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NetworkingMenuPage } from '../networking-menu/networking-menu';
import { NetworkingProfilePage } from '../networking-profile/networking-profile';
import { SopernwProvider } from '../../providers/sopernw/sopernw';
import { sessions } from '../../class/sessions/sessions';
import { transaction, item } from '../../class/models/models';

/**
 * Generated class for the NetworkingSearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-networking-search',
  templateUrl: 'networking-search.html',
})
export class NetworkingSearchPage {
  searchTerms:string="";
  economicSectors:item[]=[];
  professions:item[]=[];
  loading=false;
  profiles:any[]=[];
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private _sopwenw:SopernwProvider,
    private _session:sessions) {
  }

  ionViewDidLoad() {
    this.GetProfessions();
  }

  getItems(){
    
  }

  goHome(){
    this.navCtrl.setRoot(NetworkingMenuPage);
  }
  goOtherProfile(profile:any){
    this.navCtrl.push(NetworkingProfilePage,{'myProfile':false,'profile': profile})
  }

  GetSoPernw(){
    this.loading=true;
   this._sopwenw.GeSoPernw(this._session.GetClientEmpCodi(),this.searchTerms).then((resp:transaction)=>{
     this.loading=false;
    if(resp!=null && resp.Retorno==0){

      this.profiles = resp.ObjTransaction;
    }
   })
  }

  GetProfessions() {

    this._session.getProfessions().then((resp: item[]) => {
      if (resp) {
        this.professions = resp;
      }
    });
  }

  getProfession(profile:any) {
    let data = this.professions.filter(
      (t) => t.Ite_cont == profile.ite_prof
    )[0];
    return data == undefined ? "Sin Definir" : data.Ite_nomb;
  }


  getSectorName(profile:any) {
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
}
