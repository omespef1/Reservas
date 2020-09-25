import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { AeDetin, transaction } from '../../class/models/models';
import { GntipdoProvider } from '../../providers/gntipdo/gntipdo';
import { sessions } from '../../class/sessions/sessions';

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
  typesDocs:any[];
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private view:ViewController,private _gntipdo:GntipdoProvider,private _session:sessions) {
  }

  ionViewDidLoad() {
    this.invited = new AeDetin();
    
  }
  ngOnInit(){
    this.GetTypesDocs();
  }
  closeModal(){
   this.view.dismiss();
  }

  addInvited(){
    this.view.dismiss(this.invited);
  }

  GetTypesDocs(){
    this._gntipdo.GetGnTipdo(this._session.GetClientEmpCodi()).then((resp:transaction)=>{
      if(resp.ObjTransaction){
        this.typesDocs = resp.ObjTransaction;
      }
    })
  }
}
