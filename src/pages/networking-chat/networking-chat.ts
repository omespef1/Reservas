import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
/**
 * Generated class for the NetworkingChatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-networking-chat',
  templateUrl: 'networking-chat.html',
})
export class NetworkingChatPage {
  items: Observable<any[]>;
  constructor(
    public db: AngularFireDatabase,
    public navCtrl: NavController,
  ) {

    this.items = db.list('list').valueChanges();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad NetworkingChatPage');
  }
}
