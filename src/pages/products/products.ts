import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController } from 'ionic-angular';
//Pages
import {DisponibilityPage} from '../disponibility/disponibility';

//providers
import { ProductsProvider } from '../../providers/products/products';

/**
 * Generated class for the ProductsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-products',
  templateUrl: 'products.html',
})
export class ProductsPage {
  classSpace: any = {};
  products: any[];
  constructor(public navCtrl: NavController, public navParam: NavParams, private _product: ProductsProvider, private actionCtrl: ActionSheetController) {
    this.classSpace = navParam.get('classSpace');

  }

  ionViewDidLoad() {
    this.GetProducts();
  }

  GetProducts() {
    this._product.GetProducts(this.classSpace).then((resp: any) => {
      if (resp != null) {
        this.products = resp.ObjTransaction;
      }
    })
  }
  SetProducts(product: any) {
    let modal = this.actionCtrl.create({
      buttons: [
        {
          icon: 'person',
          text: 'Profesional',
          handler: () => {

          }
        },
        {
          icon: 'calendar',
          text: 'Disponibilidad de fecha',
          handler: () => {
            this.navCtrl.push(DisponibilityPage);
          }
        }
      ],

      title: '¿Como desea realizar la búsqueda de disponibilidad para su reserva?'
    });


    if (product.esp_mdit.toString().toUpperCase() == "S") {
          modal.present();
    }
    else {
       this.navCtrl.push(DisponibilityPage);

    }

  }

}
