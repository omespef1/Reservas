import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { eccotiz, EcDespa } from '../../class/models/models';
import { EventCotizProductsChildsPage } from '../event-cotiz-products-childs/event-cotiz-products-childs';

/**
 * Generated class for the EventCotizProductsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-event-cotiz-products',
  templateUrl: 'event-cotiz-products.html',
})
export class EventCotizProductsPage {
cotiz:eccotiz= new eccotiz();
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.cotiz = navParams.get('cotiz');
    console.log(this.cotiz);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventCotizProductsPage');
  }


  seeChilds(espacio:EcDespa){
    this.navCtrl.push(EventCotizProductsChildsPage,{'espacio':espacio})

  }
}
