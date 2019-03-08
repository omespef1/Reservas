import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,ViewController} from 'ionic-angular';
//providers
import {MainTemplatesProvider} from '../../providers/main-templates/main-templates';
//models
import { transaction ,ecmcomp,disponibilityRequestEvent, bookingInfo} from '../../class/Models/models';
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

  ecmcomp:ecmcomp[]=[];
  booking:bookingInfo;

  constructor(public navCtrl: NavController, public navParams: NavParams, private _main:MainTemplatesProvider,private sesion:sessions,
    private _view:ViewController) {
       this.booking = navParams.get("booking");
       this.ecmcomp = this.booking.ecmcomp|| null;
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
    if(this.ecmcomp==null){
       let transact : transaction =   <transaction> await  this._main.GetEcMconmp()
       if(transact!=null &&  transact.Retorno==0){        
          this.ecmcomp = transact.ObjTransaction;
       }
      }
  }

  addremove(item:any){
    item.checked = !item.checked;
  }

  save(){    
     this._view.dismiss(this.ecmcomp.filter(e=>e.checked==true && e.quantity>0) )   
  }
  close(){
    this._view.dismiss();
  }
  valid(){
    return this.ecmcomp !=null && this.ecmcomp.filter(e=>e.checked==true && e.quantity>0).length>0 
  }

}
