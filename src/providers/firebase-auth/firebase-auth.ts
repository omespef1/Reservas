
import { Injectable } from '@angular/core';
import { AngularFireAuth } from "angularfire2/auth";
import firebase from "firebase";

/*
  Generated class for the FirebaseAuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FirebaseAuthProvider {
  public usuario: any = {};
  constructor(public afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe((user) => {
      console.log("Estado del usuario: ", user);

      if (!user) {
        return;
      }

      this.usuario.nombre = user.displayName;
      this.usuario.uid = user.uid;
    });
  }


  logout() {
    this.usuario = {};
    this.afAuth.auth.signOut();
  }

  loginWithMail(user: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(user, password);
  }

  signInWithMail(mail: string, password: string) {
    return this.afAuth.auth
      .createUserWithEmailAndPassword(mail, password)
     
  }

  updateUser(displayName:string) {
    
    var user = firebase.auth().currentUser;
    user.updateProfile({
      displayName: displayName
   
    }).then(function() {
      console.log("usuario actualizado");
    }).catch(function(error) {
      // An error happened.
    });
  }


}
