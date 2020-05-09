import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the NetworkingEditTextPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-networking-edit-text',
  templateUrl: 'networking-edit-text.html',
})
export class NetworkingEditTextPage {

  editText:string="";
  title:string="";

  constructor(public navCtrl: NavController, public navParams: NavParams,private _view:ViewController) {
    // this.editText = navParams.get('data').editText;
    // this.title = navParams.get('data').title;
    this.title  = navParams.get('title');
    this.editText = navParams.get('editText');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NetworkingEditTextPage');
  }

  closeModal(){
    this._view.dismiss();
  }

  ok(){
    this._view.dismiss({ 'editText': this.editText})
  }

}
