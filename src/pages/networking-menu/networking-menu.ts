import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { transactionNumber, user, ae_param } from '../../class/models/models';
import { AeinappProvider } from '../../providers/aeinapp/aeinapp';
import { sessions } from '../../class/sessions/sessions';
import { NetworkingTermsPage } from '../networking-terms/networking-terms';
import { NetworkingSearchPage } from '../networking-search/networking-search';
import { NetworkingProfilePage } from '../networking-profile/networking-profile';


/**
 * Generated class for the NetworkingMenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-networking-menu',
  templateUrl: 'networking-menu.html',
})
export class NetworkingMenuPage {
  user:user;
  params:ae_param;
  constructor(public navCtrl: NavController, public navParams: NavParams,private _aeinapp:AeinappProvider,
    private _sesions:sessions,private _modal:ModalController) {
    this.params = this._sesions.getAeParam();
this._sesions.GetLoggedin().then((resp:user)=>{
  this.user = resp;
})
  }

  ionViewDidLoad() {
    // if(!this.GetExistsTerms()){
        
    // }
  }

  showModalTerms(){
    let modal = this._modal.create({
      componenent: NetworkingTermsPage
    });
    modal.present();
  }

  goNetworkingSearch(){
    this.navCtrl.setRoot(NetworkingSearchPage);
  }

  async GetExistsTerms():Promise<boolean>{
    let request:transactionNumber =   await<any>   this._aeinapp.ExistsAeInapp(this.user.Emp_codi,this.user.Soc_cont,this.user.Sbe_cont,this.user.Mac_nume)
     if(request!=null && request.Retorno==0){
         return false;
     }
     else
     return true;
   }


   goProfile(){
     this.navCtrl.setRoot(NetworkingProfilePage);
   }

  

}
