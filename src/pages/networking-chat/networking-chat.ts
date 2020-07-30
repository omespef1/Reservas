import { Component, OnInit, ViewChild, OnDestroy } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ViewController,
  PopoverController,
  Content,
} from "ionic-angular";

import { AngularFirestore } from "angularfire2/firestore";
import { Observable } from "rxjs/Observable";
import { ChatProvider } from "../../providers/chat/chat";
import { sopernw, transaction } from "../../class/Models/models";
import { sessions } from "../../class/sessions/sessions";
import { FirebaseAuthProvider } from "../../providers/firebase-auth/firebase-auth";
import { SopernwProvider } from "../../providers/sopernw/sopernw";
import { PartnerProvider } from "../../providers/partner/partner";
import { NativeRingtones } from "@ionic-native/native-ringtones";
import { Subscription } from "rxjs";
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
export class NetworkingChatPage implements OnInit,OnDestroy  {
  @ViewChild(Content) content: Content;
  message: string;
  element: any;
  userProfile: any = {};
  idChat: string;
  partnerPhoto: string;
  listener:Subscription;
  constructor(
    public _chat: ChatProvider,
    private _session: sessions,
    private nav: NavParams,
    public auth: FirebaseAuthProvider,
    private _sopernw: SopernwProvider,
    private _sosocio: PartnerProvider,
    private ringtones: NativeRingtones
  ) {}

  async ngOnInit() {
    this.userProfile = this.nav.get("profile");
    this.idChat = this._chat.GetChatName(this.userProfile.per_uuid);
    this.GetPhoto(this.userProfile.per_uuid);
    console.log(this.userProfile);
    this.element = document.getElementsByClassName("scroll-content");
    this._chat.SetNewChatRoom(this.userProfile, this.idChat).then(() => {
      //this.element.scrollTop = this.element.scrollHeight;
      console.log("nuevo elemento");
  this.listener =    this._chat.loadMessagesChat(this.idChat).subscribe(()=>{
        setTimeout(() => {
          this.content.scrollToBottom();
        }, 100);
      })
      
    });
  }

 


  sendMessage() {
    if (this.message.length > 0) {
      this._chat
        .sendMessage(this.message, this.idChat)
        .then(() => {
          console.log("mensaje enviado");
          this.message = "";       
        })
        .catch((err) => console.error("Error al enviar", err));
    }
  }

  async GetPhoto(uiidPartner: string) {
    let companyCode = await this._session.getEmpCodiSession();
    let soprenw = this._sopernw
      .GetSoPernwByUuid(uiidPartner)
      .then((resp: transaction) => {
        let socio = resp.ObjTransaction[0];
        this._sopernw
          .GetPhoto(
            socio.EMP_CODI,
            socio.PER_CONT
          )
          .then((resp: transaction) => {
            if (resp != null && resp.Retorno == 0) {
              this.partnerPhoto = `data:image/jpeg;base64,${resp.ObjTransaction}`;
            }
          });
      });
  }
  ngOnDestroy(): void {
    
    console.log('destruido');
    this.listener.unsubscribe();
    this._chat.chats=[];
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    
  }
}
