import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

//providers
import {ProductsProvider} from '../../providers/products/products';

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
  classSpace: any={};
  products:any[];
  constructor(public navCtrl: NavController, public navParam: NavParams,private _product:ProductsProvider) {
    this.classSpace = navParam.get('classSpace');

  }

  ionViewDidLoad() {
  this.GetProducts();
  }

    GetProducts(){
      this._product.GetProducts(this.classSpace).then((resp:any)=>{
        if(resp!=null){
            this.products = resp.ObjTransaction;
        }
      })
    }

}
