import { Injectable } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
  QueryDocumentSnapshot,
  DocumentChangeAction,
} from "angularfire2/firestore";
import { message } from '../../interfaces/chat';
import firebase from "firebase";
import { FirebaseAuthProvider } from "../firebase-auth/firebase-auth";

/*
  Generated class for the ChatProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ChatProvider {
  public chats: DocumentChangeAction<message>[];
  public captcha: any;
  constructor(
    private afs: AngularFirestore,
    private _auth: FirebaseAuthProvider
  ) {}

  SetNewChatRoom(profile: any, chatName: string) {
    // Add a new document in collection "cities"

  return  this.afs
      .collection("chat-rooms")
      .doc(chatName)
      .set({
        users: [profile.per_uuid, this._auth.user.uid],
      })
  }
  loadMessagesChat(chatId: string) {
    console.log("cargando mensajes...");
    console.log(chatId);
    let collection = this.afs
      .collection<message>("chat-rooms")
      .doc(chatId)
      .collection<message>("messages", (ref) =>
        ref.orderBy("date", "desc").limit(30)
      );


      return collection.snapshotChanges().map((resp)=>{
      console.log(resp);
        this.chats=[];    
        resp.forEach(element => {         
          this.chats.unshift(element);          
          if(element.payload.doc.data().uid != this._auth.user.uid && !element.payload.doc.data().read ){
            collection.doc(element.payload.doc.id).update({read:true}).then(()=>{ console.log("leido")});
          }  
        });      
        console.log('termina de llenar')             
      })
//     return collection.valueChanges().map((messages) => {
//       this.vibration.vibrate(500);
//       this.chats = [];
// console.log('chats reseteados');
//       console.log(messages);
//       let indice =0;
//       for (let message of messages) {
//         console.log(`insertando mensaje ${indice + 1}`);
//         this.chats.unshift(message);
//         indice+=1;
        

//         // firebase.firestore().doc('chat-rooms/chat_YGdgCpgNFHelyCCm7iZ98nHlHYE3_r6uUFClQ8sRsYi63GySUNPDupHn2/messages/F9KKpq5pSa2n9kc1E5Tx')
//         // const ref = firebase.firestore().doc('chat-rooms/chat_YGdgCpgNFHelyCCm7iZ98nHlHYE3_r6uUFClQ8sRsYi63GySUNPDupHn2/messages/F9KKpq5pSa2n9kc1E5Tx');
//         // ref.onSnapshot((doc) => {
//         //   const data = doc.data();
//         //   // ...
//         // });


//       }
//     });
  }

  loadMessagesChatLastChat(chatId: string) {
    console.log("cargando mensajes...");
    console.log(chatId);
    let collection = this.afs
      .collection<message>("chat-rooms")
      .doc(chatId)
      .collection<message>("messages", (ref) =>
        ref.orderBy("date", "desc").limit(1)
      );
    return collection.valueChanges().map((messages) => {
      return messages[0];
    });
  }

  sendMessage(messageStr: string, chatId: string) {
    let message: message = {
      uid: this._auth.user.uid,
      content: messageStr,
      date: new Date().getTime(),
      read: false,
    };
    return this.afs
      .collection("chat-rooms")
      .doc(chatId)
      .collection("messages")
      .add(message);
  }

  GetChatName(uidPartner: string) {
    return (
      "chat_" +
      (uidPartner < this._auth.user.uid
        ? uidPartner + "_" + this._auth.user.uid
        : this._auth.user.uid + "_" + uidPartner)
    );
  }

  GetChatRoomsFromUser() {}
  // loginWithSms() {
  //   console.log("entra phone");
  //   this.captcha = new firebase.auth.RecaptchaVerifier("sign-in-number", {
  //     size: "invisible",
  //     callback: function (response) {
  //       console.log("reCAPTCHA solved, allow signInWithPhoneNumber.");
  //       var phoneNumber = "+573192972505";
  //       var appVerifier = this.captcha.recaptchaVerifier;
  //       firebase
  //         .auth()
  //         .signInWithPhoneNumber(phoneNumber, appVerifier)
  //         .then(function (confirmationResult) {
  //           console.log("mensaje enviado");
  //           // SMS sent. Prompt user to type the code from the message, then sign the
  //           // user in with confirmationResult.confirm(code).
  //           this.captcha.confirmationResult = confirmationResult;
  //         })
  //         .catch(function (error) {
  //           // Error; SMS not sent
  //           // ...
  //           console.log("error");
  //         });
  //     },
  //   });
  // }
}


