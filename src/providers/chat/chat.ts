
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

  public captcha: any;
  private collection :AngularFirestoreDocument<message>;
  constructor(private afs: AngularFirestore,private _auth:FirebaseAuthProvider ) {

  }


  SetNewCharRoom(uuid:string){
    const chatName= 'chat_'+(uuid< this._auth.user.uid? uuid+'_'+this._auth.user.uid : this._auth.user.uid+'_'+uuid);
    // Add a new document in collection "cities"
this.collection.collection("chat-rooms").doc(chatName)
  }
  loadMessagesChat(id:string) {
    this.collection= this.afs.collection<message>(`chat-rooms/${id}/chat-mesagges`, (ref) =>
      ref.orderBy("date", "desc").limit(15)
    );
    return this.collection.valueChanges().map((messages) => {
      this.chats = [];
      console.log(messages);
      for (let message of messages) {
        this.chats.unshift(message);
      }
    });
  }

  sendMessage(messageStr:string,userId:number) {
    let message: message = {
      profileId: userId,
      message: messageStr,
      date: new Date().getTime(),
    };
    return this.collection.add(message);
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
