import { Component, OnInit, ɵConsole } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NetworkingMenuPage } from '../networking-menu/networking-menu';
import { NetworkingProfilePage } from '../networking-profile/networking-profile';
import { NetworkingChatPage } from '../networking-chat/networking-chat';
import { ChatRoomProvider } from '../../providers/chat-room/chat-room';
import { sessions } from '../../class/sessions/sessions';
import { NetworkingSearchPage } from '../networking-search/networking-search';
import { FirebaseAuthProvider } from '../../providers/firebase-auth/firebase-auth';

/**
 * Generated class for the NetworkingMessagesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-networking-messages',
  templateUrl: 'networking-messages.html',
})
export class NetworkingMessagesPage implements OnInit {
  
  constructor(public _chatRooms:ChatRoomProvider,private navCtrl:NavController,private _sesion:sessions,
    public _auth:FirebaseAuthProvider) {
    
  
  }

  async ngOnInit(){
  //  let userProfile =  await this._sesion.GetNetworkingUser();
   
     this._chatRooms.loadChatRooms();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NetworkingMessagesPage');
  }

  goHome(){
    this.navCtrl.setRoot(NetworkingMenuPage);
  }
  goOtherProfile(){
    this.navCtrl.push(NetworkingProfilePage,{'myProfile':false})
  }
  goChat(users:any[]){
   
    this.GetUserName(users);
    // this.navCtrl.push(NetworkingChatPage,{'profile':{ per_uuid: uiid ,sbe_nomb:'Prueba'}});
  }
  goProfiles(){
    this.navCtrl.push(NetworkingSearchPage,{ 'mode' : 2 })
  }
  GetUserName(users:any[]){
    const uiid = this._auth.GetUuidPartnerFromKeyPair(users);
  //  return "Prueba";
    return this._auth.GetUserName(uiid).subscribe(resp=>{
      console.log(resp.payload.data());
    })
  }

}
