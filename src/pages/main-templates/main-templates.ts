import { Component, ViewChild, Renderer } from '@angular/core';
import { IonicPage, NavController, NavParams ,ViewController, ListHeader, ItemGroup} from 'ionic-angular';
//providers
import {MainTemplatesProvider} from '../../providers/main-templates/main-templates';
//models
import { transaction ,ecmcomp,disponibilityRequestEvent, bookingInfo} from '../../class/models/models';
//clases
import {sessions } from '../../class/sessions/sessions';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
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
  accordionExapanded = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, private _main:MainTemplatesProvider,private sesion:sessions,
    private _view:ViewController) {
       this.booking = navParams.get("booking");
       this.ecmcomp = this.booking.ecmcomp|| null;
  }

  ngOnInit(): void {
    
    
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
          this.ecmcomp = this.ecmcomp.filter(d=>d.detalles!=undefined)
          console.log(this.ecmcomp);
       }
      }

      this.max = <number> await this.sesion.GetEventQuantity();
  }

  addremove(item:any){
    item.checked = !item.checked;
  }

  save(){    
    
     this._view.dismiss(this.ecmcomp.filter(e=> Number(e.quantity)>0 && Number(e.quantity) <= this.max && e.checked==true));
  }
  close(){
    this._view.dismiss();
  }
  valid(){
  
    if(this.ecmcomp==null)
    return false;       
   return this.ecmcomp.filter(e=> Number(e.quantity)>0 && Number(e.quantity) <= this.max && e.checked==true).length>0;    
  }
  toggleSection(i){
      this.ecmcomp[i].open = !this.ecmcomp[i].open;
  }

}
