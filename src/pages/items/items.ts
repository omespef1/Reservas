import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';
//interfaces
import {item,itemSource} from '../../class/models/models';


/**
 * Generated class for the ItemsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-items',
  templateUrl: 'items.html',
})
export class ItemsPage {
  source:itemSource;
   itemsList:item[]=[];
  constructor(public navCtrl: NavController, public navParams: NavParams,private viewCtrl:ViewController) {
    this.source = navParams.get('source');
    this.initializeItems();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ItemsPage');
  }
  close(item:item=null){
    this.viewCtrl.dismiss(item);
  }
  getItems(q: string) {
    console.log(q);
  //Reseteo los items a su estado original
  this.initializeItems();
//Si el valor es vacío no filtra ndada
  if (!q || q.trim() === '') {
  return;
  }

  //Realiza el filtrado
  this.itemsList = this.itemsList.filter((v) =>  v.Ite_nomb.toLowerCase().indexOf(q.toLowerCase()) > -1);
}
initializeItems(): void {
 this.itemsList = this.source.items;
}
}
