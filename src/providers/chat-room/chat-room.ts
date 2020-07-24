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

    // let db = this.afs.firestore;
    //   let collection =  db.collection("chat-rooms").where(firebase.firestore.FieldPath.documentId,
    // .get()
    // .then(function(querySnapshot) {
    //     querySnapshot.forEach(function(doc) {
    //         // doc.data() is never undefined for query doc snapshots
    //         console.log(doc.id, " => ", doc.data());
    //     });
    // })
    // .catch(function(error) {
    //     console.log("Error getting documents: ", error);
    // });



  }

  newChatRoom(){
    this.chatRoomsCollection = this.afs.collection<chatRoom>("chat-rooms");
    
      //this.chatRoomsCollection.add()
  }
}
