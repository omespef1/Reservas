import { Component, OnInit, ɵConsole, OnDestroy } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NetworkingMenuPage } from '../networking-menu/networking-menu';
import { NetworkingProfilePage } from '../networking-profile/networking-profile';
import { NetworkingChatPage } from '../networking-chat/networking-chat';
import { ChatRoomProvider } from '../../providers/chat-room/chat-room';
import { sessions } from '../../class/sessions/sessions';
import { NetworkingSearchPage } from '../networking-search/networking-search';
import { FirebaseAuthProvider } from '../../providers/firebase-auth/firebase-auth';
import { chatRoom } from '../../interfaces/chat';

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
export class NetworkingMessagesPage implements OnInit,OnDestroy {
  
  constructor(public _chatRooms:ChatRoomProvider,private navCtrl:NavController,private _sesion:sessions,
    public _auth:FirebaseAuthProvider) {
    
  
  }

  async ngOnInit(){
  //  let userProfile =  await this._sesion.GetNetworkingUser();
   
    
  }

  ionViewDidLoad() {
   var suscription = this._chatRooms.loadChatRooms()
    console.log('ionViewDidLoad NetworkingMessagesPage');
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    console.log('destruidos last');
    
  }

  goHome(){
    this.navCtrl.setRoot(NetworkingMenuPage);
  }
  goOtherProfile(){
    this.navCtrl.push(NetworkingProfilePage,{'myProfile':false})
  }
  goChat(chat:chatRoom){
   
  //  this.GetUserName(users);
  this._chatRooms.subscription.unsubscribe();
   this.navCtrl.push(NetworkingChatPage,{'profile':{ per_uuid: chat.uidPartner ,sbe_nomb:chat.displayNameUser,oneSignalId: chat.oneSignalId}});
  }
  goProfiles(){
    this.navCtrl.push(NetworkingSearchPage,{ 'mode' : 2 })
  }
  GetUserName(users:any[]){
  //   const uiid = this._auth.GetUuidPartnerFromKeyPair(users);
  // //  return "Prueba";
  //   return this._auth.GetUserName(uiid).subscribe(resp=>{
  //     console.log(resp.payload.data());
  //   })
  }

  

}