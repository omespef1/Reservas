import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
//providers
import { PqrProvider } from '../../providers/pqr/pqr';
//pages
import { ItemsPage } from '../items/items';
//clases
import { sessions } from '../../class/sessions/sessions';
//interfaces
import { item, itemSource, pqr } from '../../class/Models/models';

/**
 * Generated class for the NewPqrPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-new-pqr',
  templateUrl: 'new-pqr.html',
})
export class NewPqrPage {

  typesPqr: item[] = [];
  ambientsPqr: item[] = [];
  pqr: pqr = new pqr();
  typePqrSelected: string;
  ambientSelected:string;
  constructor(public navParams: NavParams, private _pqr: PqrProvider, private _sesion: sessions, private modalCtrl: ModalController) {
    this.setSourcesItems();
  }

  ionViewDidLoad() {

  }
  setSourcesItems(){
    this._sesion.getReasonsPqr().then(resp => {
      //Llena el source del modal para tipo de pqr
      this.typesPqr = resp;
    });

    this._sesion.getAmbientPqr().then((resp:any) => {
      //Se convierte la lista de gnArbol a tipo item para llenar el source de motivo de pqr
      let newListOfItems: item[]=[];
      for(let newItem of resp){
        let item:item = {Ite_cont: newItem.Arb_cont,Ite_codi:"0",Ite_nomb:newItem.Arb_nomb,Tit_cont:0}
        newListOfItems.push(item);
      }
      //Se almacena el resultado del bucle para usarlo posteriormente
      this.ambientsPqr = newListOfItems;
    })
  }
  openTypesPqr():void {
    //Se abre el moddal de tipos de pqr
    let source: itemSource;
    source = { icon: 'text', items: this.typesPqr, title: 'Tipo de PQR' }
    let modal = this.modalCtrl.create(ItemsPage, { 'source': source })
    modal.present();
    modal.onDidDismiss((resp: item) => {
      this.pqr.ite_tpqr = resp.Ite_cont;
      this.typePqrSelected = resp.Ite_nomb;
    })
  }
  openAmbients():void {
    //Se abre el modal de motivos de pqr
    let source: itemSource;
    source = { icon: 'text', items: this.ambientsPqr, title: 'Ambiente' }
    let modal = this.modalCtrl.create(ItemsPage, { 'source': source })
    modal.present();
    modal.onDidDismiss((resp: item) => {
      this.pqr.arb_ccec = resp.Ite_cont.toString();
      this.ambientSelected = resp.Ite_nomb;
    })
  }
  addPqr():void{
    console.log(this.pqr);
  }

}
