import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NetworkingMenuPage } from '../networking-menu/networking-menu';
import { NetworkingProfilePage } from '../networking-profile/networking-profile';
import { NetworkingChatPage } from '../networking-chat/networking-chat';
import { ChatRoomProvider } from '../../providers/chat-room/chat-room';
import { sessions } from '../../class/sessions/sessions';

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
  
  constructor(public _chatRooms:ChatRoomProvider,private navCtrl:NavController,private _sesion:sessions) {
    
  
  }

  async ngOnInit(){
   let userProfile =  await this._sesion.GetNetworkingUser();
   
    this._chatRooms.loadChatRooms(userProfile.per_cont, this._sesion.GetClientEmpCodi());
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
  goChat(id:string){
    this.navCtrl.push(NetworkingChatPage,{'chat-id':id});
  }



}
