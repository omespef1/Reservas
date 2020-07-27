
import { Injectable } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from "angularfire2/firestore";
import { message } from "../../interfaces/chat";
import firebase from "firebase";
import { FirebaseAuthProvider } from "../firebase-auth/firebase-auth";
import { Vibration } from '@ionic-native/vibration';


/*
  Generated class for the ChatProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ChatProvider {
  public chats: message[] = [];  
  public captcha: any;
  constructor(private afs: AngularFirestore,private _auth:FirebaseAuthProvider ,private vibration: Vibration) {

  }


  SetNewChatRoom(profile:any,chatName:string){
   
    // Add a new document in collection "cities"

this.afs.collection("chat-rooms").doc(chatName).set({
  users: [profile.per_uuid,this._auth.user.uid ]
}).then(resp=>{
  console.log('coleccion creada');

});
return this.loadMessagesChat(chatName);
  }
  loadMessagesChat(chatId:string) {
    console.log('cargando mensajes...');
    console.log(chatId);
   let collection = this.afs.collection<message>('chat-rooms').doc(chatId).collection<message>('messages',(ref) =>
      ref.orderBy("date", "desc").limit(15)
    );
    return collection.valueChanges().map((messages) => {
      this.vibration.vibrate(500);
      this.chats = [];
      console.log(messages);
      for (let message of messages) {
        this.chats.unshift(message);
      }
    });
  }

  loadMessagesChatLastChat(chatId:string) {
    console.log('cargando mensajes...');
    console.log(chatId);
   let collection = this.afs.collection<message>('chat-rooms').doc(chatId).collection<message>('messages',(ref) =>
      ref.orderBy("date", "desc").limit(1)
    );
    return collection.valueChanges().map((messages) => {
    
     return messages[0];
    });
  }

  sendMessage(messageStr:string,chatId:string) {
    let message: message = {
      uid: this._auth.user.uid,
      content: messageStr,
      date: new Date().getTime(),
      read:false
    };
    return this.afs.collection('chat-rooms').doc(chatId).collection('messages').add(message);
  }


GetChatName(uidPartner:string){
  return'chat_'+(uidPartner< this._auth.user.uid? uidPartner+'_'+this._auth.user.uid : this._auth.user.uid+'_'+uidPartner);
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
