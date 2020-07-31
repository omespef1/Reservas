
import { Injectable } from '@angular/core';
import { AngularFireAuth } from "angularfire2/auth";
import firebase from "firebase";
import { AngularFirestore } from "angularfire2/firestore";

/*
  Generated class for the FirebaseAuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FirebaseAuthProvider {
  public user: firebase.UserInfo;
  constructor(public afAuth: AngularFireAuth,private _firestore:AngularFirestore) {
    this.afAuth.authState.subscribe((user) => {
      console.log("Estado del usuario: ", user);

      if (!user) {
        return;
      }

     this.user  = user;
    });
  }

  
  logout() {
    console.log("sesión de chat cerrada");
    this.user = null;
    this.afAuth.auth.signOut();
  }

  loginWithMail(user: string, password: string,displayName:string,oneSignalId:string) {
    console.log("actualizado username",displayName);
      this.afAuth
      .auth
      .signInWithEmailAndPassword(user, password)
      .then(value => {
        console.log('login firebase satisfactorio');
       // this.updateUser(displayName);
       this.addUser(displayName);
        
      })
      .catch( (err:any)=> {   
        console.log(err);
         if(err.code =="auth/user-not-found"){
          console.log("Usuario de chat no creado.Creando...");
          this.signInWithMail(user,password).then(resp=>{
            if(resp){
              //this.updateUser(displayName);
              this.addUser(displayName);
            
            }
          })
         }
       })
  }

 loggued(){
   this.afAuth.user;
 }


  signInWithMail(mail: string, password: string) {
    return this.afAuth.auth
      .createUserWithEmailAndPassword(mail, password)
     
  }

  // updateUser(displayName:string) {
    
  //   var user = firebase.auth().currentUser;
  //   user.updateProfile({
  //     displayName: displayName
   
  //   }).then(function() {
  //     this.addUser();
  //     console.log("usuario actualizado");
  //   }).catch(function(error) {
  //     console.log("error actualizando");
  //   });
  // }


addUser(displayName:string){
  this._firestore.collection('users').doc(firebase.auth().currentUser.uid).set({
    displayName: displayName,
    OneSignalId: 
  })
}
GetUserName(uiid){
  console.log(uiid);
 return this._firestore.collection('users').doc(uiid).snapshotChanges();

}

GetUuidPartnerFromKeyPair(users){
 
    let partnerProfile = users.filter(v=> v != this.user.uid );
    return partnerProfile[0];
}

}
