import { Component, OnInit } from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams,
  ViewController,
  PopoverController,
} from "ionic-angular";

import { AngularFirestore } from "angularfire2/firestore";
import { Observable } from "rxjs/Observable";
import { ChatProvider } from "../../providers/chat/chat";
import { sopernw } from '../../class/Models/models';
import { sessions } from '../../class/sessions/sessions';
/**
 * Generated class for the NetworkingChatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */



@IonicPage()
@Component({
  selector: "page-networking-chat",
  templateUrl: "networking-chat.html",
})
export class NetworkingChatPage  implements OnInit{
 message:string;
 element:any;
 userProfile:sopernw;
 idChat:string;
  constructor(

    public _chat: ChatProvider,
    private _session:sessions,
    private nav:NavParams
  ) {
 
  }

async ngOnInit(){
  this.idChat = this.nav.get("chat-id");
  console.log(this.idChat);
  this.element = document.getElementById("chat-messages");
  this.userProfile = await this._session.GetNetworkingUser()
  this._chat.loadMessagesChat(this.idChat).subscribe(()=>{         
    this.element.scrollTop = this.element.scrollHeight;
  
});

}

  sendMessage(){
    if(this.message.length>0){
    this._chat.sendMessage(this.message,this.userProfile.per_cont).then(()=>{
      console.log("mensaje enviado")
      this.message="";
    })
    .catch(err=> console.error('Error al enviar',err))
    }
  }

   
}
