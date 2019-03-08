import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
//providers
import {MainTemplatesProvider} from '../../providers/main-templates/main-templates';
//models
import { transaction ,ecmcomp,disponibilityRequestEvent} from '../../class/Models/models';
//clases
import {sessions } from '../../class/sessions/sessions';
/**
 * Generated class for the MainTemplatesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-main-templates',
  templateUrl: 'main-templates.html',
})
 

export class MainTemplatesPage {

  max:number=0;

  ecmcomp:ecmcomp[] = new Array();
  

  constructor(public navCtrl: NavController, public navParams: NavParams, private _main:MainTemplatesProvider,private sesion:sessions) {
  
  }

  ionViewDidLoad() {
    this.GetEcMcomp();
    this.loadEventDetails();
  }

  loadEventDetails(){
    // this.sesion.GetEventPending().then((resp:disponibilityRequestEvent)=>{
    //   this.max = resp.esp_capa;
    // })
  }

  async GetEcMcomp():Promise<void>{
       let transact : transaction =   <transaction> await  this._main.GetEcMconmp()
       if(transact!=null &&  transact.Retorno==0){        
          this.ecmcomp = transact.ObjTransaction;
       }
  }

  addremove(item:any){
    item.checked = !item.checked;
  }

  save(){
    
    this.navCtrl.getPrevious().data.ecmcomp = this.ecmcomp.filter(v=>v.checked==true);
   this.navCtrl.pop();
  }

}
