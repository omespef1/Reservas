
import { Injectable } from '@angular/core';
import { AngularFireAuth } from "angularfire2/auth";
import firebase from "firebase";
import { AngularFirestore } from "angularfire2/firestore";
import { SopernwProvider } from '../sopernw/sopernw';
import { Platform } from 'ionic-angular';

/*
  Generated class for the FirebaseAuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FirebaseAuthProvider {
  public user: firebase.UserInfo;
  constructor(public afAuth: AngularFireAuth,private _firestore:AngularFirestore,private _sopernw:SopernwProvider) {
    this.afAuth.authState.subscribe((user) => {     

      if (!user) {
        return;
      }

     this.user  = user;
    });
  }

  
  logout() {
    //console.log("sesión de chat cerrada");
    this.user = null;
    this.afAuth.auth.signOut();
  }

  loginWithMail(user: string, password: string,displayName:string,oneSignalId:string,emp_codi:number,per_cont:number) {    

    return this.afAuth.auth.
    fetchSignInMethodsForEmail(user)
    .then((signInMethods) => {

      if (signInMethods.length > 0) {

        this.afAuth
        .auth
        .signInWithEmailAndPassword(user, password)
        .then(value => {      
         // this.updateUser(displayName);
         this.addUser(displayName,oneSignalId);
          this.updateTokens(emp_codi,per_cont,oneSignalId);
        })
      }

      else {

        this.afAuth.auth
        .createUserWithEmailAndPassword(user, password)
        .then((responseAuth) => {
          this.addUser(displayName,oneSignalId); 
        })
        
      }

    }
    )


     
      .catch( (err:any)=> {   
        //console.log(err);
         if(err.code =="auth/user-not-found"){         
          this.signInWithMail(user,password).then(resp=>{
            if(resp){
              //this.updateUser(displayName);
              this.addUser(displayName,oneSignalId);
            
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



addUser(displayName:string,oneSignalId:string){
  if(oneSignalId!=undefined){
    this._firestore.collection('users').doc(firebase.auth().currentUser.uid).set({
      displayName: displayName,
      OneSignalId: oneSignalId
    })
  }
  else {
    this._firestore.collection('users').doc(firebase.auth().currentUser.uid).set({
      displayName: displayName,     
    })
  }

}

async updateTokens(emp_codi:number,per_cont:number,per_osid:string){


  this._sopernw.updateTokens({emp_codi:emp_codi,per_cont:per_cont,per_osid : per_osid, per_uuid:firebase.auth().currentUser.uid}).then(()=>{
 
  
  })
 }
  

GetUserName(uiid){
  //console.log(uiid);
 return this._firestore.collection('users').doc(uiid).snapshotChanges();

}

GetUuidPartnerFromKeyPair(users){
 
    let partnerProfile = users.filter(v=> v != firebase.auth().currentUser.uid );
    return partnerProfile[0];
}

}
