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
import { FirebaseAuthProvider } from '../../providers/firebase-auth/firebase-auth';
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
 userProfile:any={};
 idChat:string;
  constructor(

    public _chat: ChatProvider,
    private _session:sessions,
    private nav:NavParams,
    public auth:FirebaseAuthProvider
  ) {
    this.userProfile = this.nav.get("profile");
  }

async ngOnInit(){
 // this.idChat = this.nav.get("chat-id");
  console.log(this.userProfile);
 this._chat.SetNewChatRoom(this.userProfile);
  this.element = document.getElementById("chat-messages");
  
  this._chat.loadMessagesChat().subscribe(()=>{         
    this.element.scrollTop = this.element.scrollHeight;
  
});

}

  sendMessage(){
    if(this.message.length>0){
    this._chat.sendMessage(this.message).then(()=>{
      console.log("mensaje enviado")
      this.message="";
    })
    .catch(err=> console.error('Error al enviar',err))
    }
  }

   
}
