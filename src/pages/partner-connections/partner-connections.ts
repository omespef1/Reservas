import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,ViewController,ModalController} from 'ionic-angular';
//Providers
import {ConnectionsProvider} from '../../providers/connections/connections';
import {GnConex} from '../../class/models/models';



/**
 * Generated class for the ConexPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-partner-connections',
  templateUrl: 'partner-connections.html',
})
export class PartnerConnectionsPage {
connections:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
     private _conect:ConnectionsProvider,private viewCtrl:ViewController,
   private modalCtrl:ModalController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConexPage');
  }

  GetConnections(){
    this._conect.GetConnections().then((resp:any)=>{
      if(resp!=null){
        this.connections = resp;
      }
    })
  }

 closeLupa(connection:GnConex){
   this.viewCtrl.dismiss(connection);
 }
 close(){
   this.viewCtrl.dismiss();
 }
}
