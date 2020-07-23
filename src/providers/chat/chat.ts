
import { Injectable } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from "angularfire2/firestore";
import { message } from "../../interfaces/chat";
import firebase from "firebase";
import { FirebaseAuthProvider } from "../firebase-auth/firebase-auth";


/*
  Generated class for the ChatProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ChatProvider {
  public chats: message[] = [];
  public chatId="";
  public captcha: any;
  constructor(private afs: AngularFirestore,private _auth:FirebaseAuthProvider ) {

  }


  SetNewChatRoom(profile:any){
    console.log(this._auth.user.uid);
    const chatName= 'chat_'+(profile.per_uuid< this._auth.user.uid? profile.per_uuid+'_'+this._auth.user.uid : this._auth.user.uid+'_'+profile.per_uuid);
    // Add a new document in collection "cities"
this.afs.collection("chat-rooms").doc(chatName).set({}).then(resp=>{
  console.log(resp);

  this.chatId = chatName;
});
  }
  loadMessagesChat() {
    console.log('CHAT ES');
    console.log(this.chatId);
   let collection = this.afs.collection<message>('chat-rooms').doc(this.chatId).collection<message>('messages',(ref) =>
      ref.orderBy("date", "desc").limit(15)
    );
    return collection.valueChanges().map((messages) => {
      this.chats = [];
      console.log(messages);
      for (let message of messages) {
        this.chats.unshift(message);
      }
    });
  }

  sendMessage(messageStr:string) {
    let message: message = {
      uid: this._auth.user.uid,
      content: messageStr,
      date: new Date().getTime(),
      read:false
    };
    return this.afs.collection('chat-rooms').doc(this.chatId).collection('messages').add(message);
  }







  GetChatRoomsFromUser(){}
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
