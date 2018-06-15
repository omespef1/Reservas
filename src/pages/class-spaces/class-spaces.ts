import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ClassSpacesProvider} from '../../providers/class-spaces/class-spaces';
//pages
import {ProductsPage} from '../products/products';

/**
 * Generated class for the ClassSpacesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-class-spaces',
  templateUrl: 'class-spaces.html',
})
export class ClassSpacesPage {
  typeSpaces : any={};
  constructor(private _classSpaces:ClassSpacesProvider,private nav:NavController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ClassSpacesPage');
  }
  GetClassSpaces(){
    this._classSpaces.GetClassSpaces().then((resp:any)=>{
      if(resp!=null){
        this.typeSpaces = resp.ObjTransaction;
      }
    })
  }
  SetProducts(ClassSpace:any){
    this.nav.push(ProductsPage,{'classSpace':ClassSpace});
  }

}
