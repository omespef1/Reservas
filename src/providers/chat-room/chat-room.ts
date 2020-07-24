import { Injectable } from '@angular/core';
import {
  AngularFirestore,
} from "angularfire2/firestore";
import { AngularFireAuth } from "angularfire2/auth";
import { FirebaseAuthProvider } from '../firebase-auth/firebase-auth';
import { room } from '../../class/Models/models';
/*
  Generated class for the ChatRoomProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ChatRoomProvider {
  public chatRooms: any[] = [];
  constructor(private afs: AngularFirestore, public afAuth: AngularFireAuth,
    private auth:FirebaseAuthProvider) {
    console.log('Hello ChatRoomProvider Provider');
  }


  loadChatRooms() {

   this.chatRooms=[];

  const ref=  this.afs.firestore.collection('chat-rooms')
    .where('users','array-contains',this.auth.user.uid);

    ref.onSnapshot((snapshot) => {
      snapshot.forEach((doc) => {
        console.log(doc.data());
       this.chatRooms.unshift(doc.data());
        // ...
      });
    });
  }
  
    // let db = this.afs.firestore;
  
  addChatRoom(room:any){
    this.chatRooms.unshift(room);
  }



}
