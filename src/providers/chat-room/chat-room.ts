import { Injectable } from '@angular/core';
import {
  AngularFirestore,
} from "angularfire2/firestore";
import { AngularFireAuth } from "angularfire2/auth";
import { FirebaseAuthProvider } from '../firebase-auth/firebase-auth';
import { chatRoom } from '../../interfaces/chat';
import { user, transaction } from '../../class/Models/models';
import { SopernwProvider } from '../sopernw/sopernw';
import { sessions } from '../../class/sessions/sessions';




/*
  Generated class for the ChatRoomProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ChatRoomProvider {
  public chatRooms: chatRoom[] = [];
  constructor(private afs: AngularFirestore, public afAuth: AngularFireAuth,
    private auth:FirebaseAuthProvider,private _sopernw:SopernwProvider,private _session:sessions) {
    console.log('Hello ChatRoomProvider Provider');
  }


  async loadChatRooms() {
 let professions = await  this._session.getProfessions();
   this.chatRooms=[];

  const ref=  this.afs.firestore.collection('chat-rooms')
    .where('users','array-contains',this.auth.user.uid);

    ref.onSnapshot((snapshot) => {
      snapshot.forEach((doc) => {
        console.log(doc.data());
       this.chatRooms.unshift({ users : doc.data().users, lastMessage:'Se acuerda de la última vez que hablamos? Pues Lo que pasa es que no estoy seguro de ese proyecto.',read:false, profession:'Ing Sistemas', displayNameUser:'Jorge Camilo Bernal'});
       for(let chat of this.chatRooms){
         let uiidPartner = this.auth.GetUuidPartnerFromKeyPair(chat.users);
            this.auth.GetUserName(uiidPartner).subscribe(resp=>{       
              let soprenw = this._sopernw.GetSoPernwByUuid(uiidPartner).then((sopernw:transaction)=>{
                let data:any =resp.payload.data();
                chat.displayNameUser = data.displayName;                     
                chat.profession = this._session.FindProfessions(professions, sopernw.ObjTransaction[0].ITE_PROF) ;
                
              })
    
            
        })  
       }
        // ...
      });
    });
  }
  
    // let db = this.afs.firestore;
  
  addChatRoom(room:any){
    this.chatRooms.unshift(room);
  }



}
