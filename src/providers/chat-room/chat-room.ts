import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { chatRoom } from '../../interfaces/chat';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
  AngularFirestoreCollectionGroup,
} from "angularfire2/firestore";
import { AngularFireAuth } from "angularfire2/auth";
import firebase, { firestore } from "firebase";
/*
  Generated class for the ChatRoomProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ChatRoomProvider {
  public chatRooms: any[] = [];
  private chatRoomsCollection: AngularFirestoreCollection<any>;
  constructor(private afs: AngularFirestore, public afAuth: AngularFireAuth) {
    console.log('Hello ChatRoomProvider Provider');
  }


  loadChatRooms(chatUserId:number,companyId:number) {
    console.log(`user id es ${chatUserId}`)
    this.chatRoomsCollection = this.afs.collection<chatRoom>("chat-rooms", (ref) =>
      ref.orderBy("date", "desc")
    .where("participants","array-contains",chatUserId).where("companyId","==",companyId)
    );
     this.chatRoomsCollection.valueChanges({ idField: 'id'}).map((chatRooms: any[]) => {
    console.log(chatRooms);
      this.chatRooms = [];
      for (let chatroom of chatRooms) {
        this.chatRooms.unshift(chatroom);
      }
   }).subscribe()




 
//  this.itemsCollection = this.afs.collection<any>("chat-rooms", (ref) =>
//       ref.orderBy("date", "desc")
//     .where("chat-rooms","array-contains",chatUserId).where("companyId","==",companyId)
//     );
//    return this.itemsCollection.valueChanges().map((chatRooms)=>{
//      console.log(chatRooms);
//     this.chatRooms = [];
//       for (let chatroom of chatRooms) {
//         this.chatRooms.unshift(chatroom);
//       }
//     })
// const ref = firebase.firestore().collection('chat-rooms');
// ref.onSnapshot((doc:any) => {

//   const data = doc;
//    console.log(doc);
  
  
//   // ...
// });
//   }

  }

  newChatRoom(){
    this.chatRoomsCollection = this.afs.collection<chatRoom>("chat-rooms");
    
      //this.chatRoomsCollection.add()
  }
}
