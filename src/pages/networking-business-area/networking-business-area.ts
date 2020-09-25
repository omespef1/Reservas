import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NetworkingMenuPage } from '../networking-menu/networking-menu';
import { EerevetProvider } from '../../providers/eerevet/eerevet';
import { sessions } from '../../class/sessions/sessions';
import { transaction, eerevet } from '../../class/models/models';

/**
 * Generated class for the NetworkingBusinessAreaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-networking-business-area',
  templateUrl: 'networking-business-area.html',
})
export class NetworkingBusinessAreaPage {
  loading=false;
  events:eerevet[]=[];
  filter="A";
  options: any[] = [
   
    { text: "Más recientes", value: "M" },
    { text: "Más antiguas", value: "A" },
   
  ];
  constructor(public navCtrl: NavController, public navParams: NavParams,private _eerevet:EerevetProvider,private _session:sessions) {
  }

  ionViewDidLoad() {
   this.GetEeRevet();
  }
  goHome(){
    this.navCtrl.setRoot(NetworkingMenuPage);
  }

  GetEeRevet(){
     this.loading =true;
     this._eerevet.GetEeRevet(this._session.GetClientEmpCodi()).then((resp:transaction)=>{
       this.loading=false;
      if(resp!=null && resp.Retorno==0){
        this.events = resp.ObjTransaction;

        if(this.events!=null && this.events.length>0){
          for(let log of this.events){
               this.GetPhoto(log)
          }
        }
       if(this.events!=undefined && this.events.length>0){
        this.setFilter(this.filter);
       }
      }
     })
  }

//   GetEeRevet(){
//     this.loading =true;
//    return this._eerevet.GetEeRevet(this._session.GetClientEmpCodi())
//  }

  GetPhoto(event:eerevet){
    console.log('consultando foto');
  this._eerevet.GetPhoto(this._session.GetClientEmpCodi(),event.rev_cont)
     .then((resp:transaction)=>{
       if(resp!=null && resp.Retorno==0){
        event.rev_foto =   "data:image/jpeg;base64," + resp.ObjTransaction.rev_foto;
       }      
     })

    
  }


  setFilter($event){
    //let orderClassifieds = this.classifieds;
    console.log($event);
console.log(this.events);
    switch ($event) {
      case "M":
        console.log("desc");
   this.events.sort((a, b) => (a.rev_fini < b.rev_fini) ? 1 : ((b.rev_fini < a.rev_fini) ? -1 : 0))
       break;
      case "A":
        console.log("asc");
        this.events.sort((a, b) => (a.rev_fini > b.rev_fini) ? 1 : ((b.rev_fini > a.rev_fini) ? -1 : 0))
        // this.classifieds.sort((a, b) =>
        // a.cla_fech < b.cla_fech ? 1 :  a.cla_fech < b.cla_fech ?-1:0
        // );  
     
        break;
      default:
       
    }
  }

}
