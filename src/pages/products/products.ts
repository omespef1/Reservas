import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController } from 'ionic-angular';
//Pages
import { DisponibilityPage } from '../disponibility/disponibility';
import { ThirdPartiesPage } from '../third-parties/third-parties';

//providers
import { ProductsProvider } from '../../providers/products/products';
//Class
import { Ifactory } from '../../class/Models/models';
import {general} from '../../class/general/general';

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
  newFactory: Ifactory ;
  products: any[];
  constructor(public navCtrl: NavController, public navParam: NavParams, private _product: ProductsProvider, private _general:general) {
    this.newFactory = navParam.get('booking');

  }

  ionViewDidLoad() {
    this.GetProducts();
  }

  GetProducts() {
    this._product.GetProducts(this.newFactory.class).then((resp: any) => {
      if (resp != null) {
        this.products = resp.ObjTransaction;
      }
    })
  }
  SetProducts(product: any) {
   this.newFactory.product = product;
    if (this.newFactory.product.esp_mdit.toString().toUpperCase() == "S") {
     this.ShowOptionsSearch();
    }
    else {
      this.newFactory.optionDisp.OpDisp = 'F';
      this.newFactory.thirdPartie = {Ter_codi:0};
      this.navCtrl.push(DisponibilityPage, { 'booking': this.newFactory });
    }

  }
  ShowOptionsSearch() {

    let buttons: any[] = [
      {
        icon: 'person',
        text: 'Profesional',
        handler: () => {
          this.newFactory.optionDisp.OpDisp = 'P';
            this.navCtrl.push(ThirdPartiesPage, { 'booking': this.newFactory });
        }
      },
      {
        icon: 'calendar',
        text: 'Disponibilidad de fecha',
        handler: () => {
          this.newFactory.optionDisp.OpDisp = 'F';
        this.navCtrl.push(DisponibilityPage, { 'booking': this.newFactory });
        }
      }
    ];
    this._general.ShowActionSheetAlert('¿Como desea realizar la búsqueda de disponibilidad?',buttons);

  }

}
