import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Refresher } from 'ionic-angular';
import {ClassSpacesProvider} from '../../providers/class-spaces/class-spaces';
//pages
import {ProductsPage} from '../products/products';
import { factory, transaction } from '../../class/models/models';
//class
import {general} from '../../class/general/general';
import { sessions } from '../../class/sessions/sessions';

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
  constructor(private _classSpaces:ClassSpacesProvider,private nav:NavController,private _general:general,private _session:sessions) {
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
        for(let space of this.typeSpaces){
          this._classSpaces.GetAePhoto(space.Emp_codi,space.Cla_cont).then((resp:transaction)=>{
            if(resp.ObjTransaction)      
            space.cla_foto = "data:image/jpeg;base64," + resp.ObjTransaction;
            else
            space.cla_foto ="";
          })
        }
        

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
