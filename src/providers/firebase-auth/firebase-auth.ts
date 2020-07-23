
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
  public user: firebase.UserInfo;
  constructor(public afAuth: AngularFireAuth) {
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

  loginWithMail(user: string, password: string) {
      this.afAuth
      .auth
      .signInWithEmailAndPassword(user, password)
      .then(value => {
        console.log('login firebase satisfactorio');
      })
      .catch( (err:any)=> {   
        console.log(err);
         if(err.code =="auth/user-not-found"){
          console.log("Usuario de chat no creado.Creando...");
          this.signInWithMail(user,password).then(resp=>{
            if(resp){
              console.log("Usuario logueado con éxito");
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
