import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertOptions } from 'ionic-angular';
import { NetworkingMenuPage } from '../networking-menu/networking-menu';
import { NetworkingClassifiedsTermsPage } from '../networking-classifieds-terms/networking-classifieds-terms';
import { ThirdPartiesPageModule } from '../third-parties/third-parties.module';
import { NetworkingClassifiedsNewPage } from '../networking-classifieds-new/networking-classifieds-new';
import { SoclanwProvider } from '../../providers/soclanw/soclanw';
import { user, transaction } from '../../class/models/models';
import { sessions } from '../../class/sessions/sessions';
import { soclanw } from '../../class/models/soclanw/soclanw';

/**
 * Generated class for the NetworkingClassifiedsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-networking-classifieds',
  templateUrl: 'networking-classifieds.html',
})
export class NetworkingClassifiedsPage {
  getting=false;
  user:user;
  classifieds:soclanw[];
  filter: string = "M";
  options: any[] = [
    { text: "Más recientes", value: "M" },
    { text: "Más Antiguos", value: "A" },
  
  ];
  optionsSheet: AlertOptions = { cssClass: "alert-nogal" };
  constructor(public navCtrl: NavController, public navParams: NavParams,private _modal:ModalController,
    private _soclanw:SoclanwProvider,private _sessions:sessions) {
    

     


  }

  ionViewDidLoad() {
    this._sessions.GetLoggedin().then((resp:user)=>{
      this.user = resp;
      this.GetSoClanws();
    })
   
    console.log('ionViewDidLoad NetworkingClassifiedsPage');
  }

  goHome(){
    this.navCtrl.setRoot(NetworkingMenuPage);
  }
  
  goTerms(){
    this.navCtrl.setRoot(NetworkingClassifiedsTermsPage)
  }

  goNewClassified(){
    
   let modal= this._modal.create(NetworkingClassifiedsNewPage);
   modal.present();
    
  }

  GetSoClanws(){
   this.getting=true;
   this._soclanw.GetSoClanw(this._sessions.GetClientEmpCodi()).then((resp:transaction)=>{
    this.getting=false;
     if(resp!=null && resp.Retorno==0){
        
      this.classifieds= resp.ObjTransaction;

      if(this.classifieds!=null && this.classifieds.length>0){
        for(let classified of this.classifieds){
         this.GetPhoto(classified);
        }
      }

     }
   })
  }

  itsMine(classified:soclanw){
    if(classified.emp_codi == this._sessions.GetClientEmpCodi()
    && classified.sbe_cont == this.user.Sbe_cont
    && classified.soc_cont == this.user.Soc_cont 
    && classified.mac_nume == this.user.Mac_nume1)
    return true;
  }

  editClassified(classified:soclanw){
    this.navCtrl.push(NetworkingClassifiedsNewPage,{ 'editClassified':classified})
  }


  GetPhoto(classified:soclanw){
    console.log('obteniendo imagenes..');
    this._soclanw.GetPhoto(classified.emp_codi,classified.cla_cont).then((resp:transaction)=>{
      if(resp!=null && resp.Retorno==0){
        classified.cla_foto = "data:image/jpeg;base64," + resp.ObjTransaction.cla_foto;
      }
    })
  }

  setFilter($event){
    
  }
  
}
