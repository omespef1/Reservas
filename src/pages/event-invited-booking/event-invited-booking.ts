import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { AeDetin, transaction, user } from '../../class/models/models';
import { GntipdoProvider } from '../../providers/gntipdo/gntipdo';
import { sessions } from '../../class/sessions/sessions';
import { PartnerProvider } from '../../providers/partner/partner';



/**
 * Generated class for the EventInvitedBookingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-event-invited-booking',
  templateUrl: 'event-invited-booking.html',
})
export class EventInvitedBookingPage implements OnInit {
  invited:AeDetin= new AeDetin();
  beneficiaries:AeDetin[]=[];
  partners:AeDetin[]=[];
  user:user = new user();
  type:string="";
  typesDocs:any[];
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private view:ViewController,private _gntipdo:GntipdoProvider,private _session:sessions,
    private _sosbene:PartnerProvider) {

       this.type =  this.navParams.get("type");
  }

  ionViewDidLoad() {
   this._session.GetBeneficiariesInviteds().then(resp=>{
     
     this.beneficiaries = resp;
   })
 
 
    
  }


  beneficiariesValid():Boolean{
    
    if(this.beneficiaries.filter(v=>v.isChecked==true).length>0){
      return true;
    }
    if(this.partners.filter(p=>p.isChecked==true).length>0){
      return true;
    }     
    return false;
  }
  ngOnInit(){
    this.GetTypesDocs();
  }
  closeModal(){
   this.view.dismiss();
  }

  addInvited(){
    if(this.type=="S"){     
        this.view.dismiss(this.beneficiaries.filter(v=>v.isChecked==true));
    }
    if(this.type=="C"){
      this.view.dismiss(this.partners.filter(v=>v.isChecked==true));
    }
   if(this.type=="I"){
     let data:AeDetin[]=[];
     data.push(this.invited);
     this.view.dismiss(data);
   }
  
  }


searchAAction(searhTerm:string){
  if(searhTerm.length<4){
    this.beneficiaries=[];
    this.partners=[];
    return;
  }
      this._sosbene.GetSoSbene(this._session.GetClientEmpCodi(),searhTerm).then((resp:transaction)=>{   
        if(resp!= null){

          this.partners = resp.ObjTransaction;
        }
      })
}
  GetTypesDocs(){
    this._gntipdo.GetGnTipdo(this._session.GetClientEmpCodi()).then((resp:transaction)=>{
      if(resp.ObjTransaction){
        this.typesDocs = resp.ObjTransaction;
      }
    })
  }
}
