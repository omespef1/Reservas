import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ClassSpacesProvider} from '../../providers/class-spaces/class-spaces';
//pages
import {ProductsPage} from '../products/products';
import {factory} from '../../class/models/models';

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
  typeSpaces:any[];
  constructor(private _classSpaces:ClassSpacesProvider,private nav:NavController) {
  }

  ionViewDidLoad() {
    this.GetClassSpaces();
  }
  GetClassSpaces(){
      console.log('cinsulta');
    this._classSpaces.GetClassSpaces().then((resp:any)=>{

      if(resp!=null){
        console.log(resp);
        this.typeSpaces = resp.ObjTransaction;
      }
    })
  }
  SetSpaceType(ClassSpace:any){
  //  let newRequest: disponibilityRequest = new disponibilityRequest();
  let newFactory:factory = new factory();
  newFactory.class = ClassSpace;
    this.nav.push(ProductsPage,{'booking':newFactory});
  }

}
