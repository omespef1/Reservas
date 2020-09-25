import { Injectable } from "@angular/core";
import { AngularFirestore } from "angularfire2/firestore";
import { AngularFireAuth } from "angularfire2/auth";
import { FirebaseAuthProvider } from "../firebase-auth/firebase-auth";
import { chatRoom, message } from "../../interfaces/chat";
import { user, transaction } from "../../class/models/models";
import { SopernwProvider } from "../sopernw/sopernw";
import { sessions } from "../../class/sessions/sessions";
import { ChatProvider } from "../chat/chat";
import { PartnerProvider } from "../partner/partner";
import { general } from "../../class/general/general";
import { Subscription } from 'rxjs';

/*
  Generated class for the ChatRoomProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ChatRoomProvider {
  public chatRooms: chatRoom[] = [];
  public subscription: Subscription;
  loading = false;
  constructor(
    private afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    private auth: FirebaseAuthProvider,
    private _sopernw: SopernwProvider,
    private _session: sessions,
    private _chat: ChatProvider,
    private _sosocio: PartnerProvider
  ) {
    console.log("Hello ChatRoomProvider Provider");
  }

  async loadChatRooms() {
    this.loading = true;
    let companyCode = await this._session.getEmpCodiSession();
    let professions = await this._session.getProfessions();

    const ref = this.afs.firestore
      .collection("chat-rooms")
      .where("users", "array-contains", this.auth.user.uid);
    console.log("auth id", this.auth.user.uid);
    ref.onSnapshot((snapshot) => {
      this.chatRooms = [];
      this.loading = false;
      snapshot.forEach((doc) => {
        console.log(doc.data());
        this.chatRooms.unshift({
          users: doc.data().users,
          lastMessage: { content: "", read: false },
          read: false,
          profession: "",
          displayNameUser: "",
          uidPartner: "",
          partnerPhoto: "assets/imgs/user-profile.svg",
          loaded: false,
          oneSignalId:''
        });
        for (let chat of this.chatRooms) {      
          let uiidPartner = this.auth.GetUuidPartnerFromKeyPair(chat.users);
          chat.uidPartner = uiidPartner;
          this.auth.GetUserName(uiidPartner).subscribe((resp) => {
            let soprenw = this._sopernw
              .GetSoPernwByUuid(uiidPartner)
              .then((sopernw: transaction) => {
                let socio = sopernw.ObjTransaction[0];
                let data: any = resp.payload.data();
                chat.displayNameUser = data.displayName;
                chat.oneSignalId = data.OneSignalId;
                chat.profession = this._session.FindProfessions(
                  professions,
                  socio.ITE_PROF
                );
                chat.loaded = true;
        this.subscription=        this._chat
                  .loadMessagesChatLastChat(
                    this._chat.GetChatName(socio.PER_UUID)
                  )
                  .subscribe((message) => {
                    console.log(message);
                    chat.lastMessage = message;
                  });
                this._sopernw
                  .GetPhoto(socio.EMP_CODI, socio.PER_CONT)
                  .then((resp: transaction) => {
                    if (resp != null && resp.Retorno == 0) {
                      chat.partnerPhoto = `data:image/jpeg;base64,${resp.ObjTransaction}`;
                    }
                  });
              });
          });
        }

        // ...
      });
    });
  }

  // let db = this.afs.firestore;

  addChatRoom(room: any) {
    this.chatRooms.unshift(room);
  }

  
}
