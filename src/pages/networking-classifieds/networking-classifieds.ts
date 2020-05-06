import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { NetworkingMenuPage } from '../networking-menu/networking-menu';
import { NetworkingClassifiedsTermsPage } from '../networking-classifieds-terms/networking-classifieds-terms';
import { ThirdPartiesPageModule } from '../third-parties/third-parties.module';
import { NetworkingClassifiedsNewPage } from '../networking-classifieds-new/networking-classifieds-new';

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

  constructor(public navCtrl: NavController, public navParams: NavParams,private _modal:ModalController) {
  }

  ionViewDidLoad() {
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
}
