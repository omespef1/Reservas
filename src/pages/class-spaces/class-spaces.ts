import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Refresher } from 'ionic-angular';
import {ClassSpacesProvider} from '../../providers/class-spaces/class-spaces';
//pages
import {ProductsPage} from '../products/products';
import {factory} from '../../class/models/models';
//class
import {general} from '../../class/general/general';

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
  constructor(private _classSpaces:ClassSpacesProvider,private nav:NavController,private _general:general) {
  }

  ionViewDidLoad() {
    this.GetClassSpaces();
  }
  GetClassSpaces(ref:Refresher=null){
    this._classSpaces.GetClassSpaces().then((resp:any)=>{

      if(resp!=null){
        this.typeSpaces = resp.ObjTransaction;
        if(ref)
        ref.complete();

      }
    })
  }
  SetSpaceType(ClassSpace:any){
  //  let newRequest: disponibilityRequest = new disponibilityRequest();
  let newFactory:factory = new factory();
  newFactory.class = ClassSpace;
    this.nav.push(ProductsPage,{'booking':newFactory});
  }
doRefresh(ref:Refresher)
{
  this.GetClassSpaces(ref);
}
showDetail(typeSpace:any){
  this._general.ShowMessageAlert('Descripción', typeSpace.Cla_desc)
}
}
