import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
//providers
import { PqrProvider } from '../../providers/pqr/pqr';
//pages
import { ItemsPage } from '../items/items';
//clases
import { sessions } from '../../class/sessions/sessions';
import { general } from '../../class/general/general';
//interfaces
import { item, itemSource, pqr, user, transaction } from '../../class/Models/models';

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
  typePqrSelected: string="";
  ambientSelected: string="";
  constructor(public navParams: NavParams, private _pqr: PqrProvider, private _sesion: sessions, private modalCtrl: ModalController, private _general: general) {
    this.setSourcesItems();
  }

  ionViewDidLoad() {
  }
  setSourcesItems() {
    this._sesion.getReasonsPqr().then(resp => {
      //Llena el source del modal para tipo de pqr
      this.typesPqr = resp;
    });

    this._sesion.getAmbientPqr().then((resp: any) => {
      //Se convierte la lista de gnArbol a tipo item para llenar el source de motivo de pqr
      let newListOfItems: item[] = [];
      for (let newItem of resp) {
        let item: item = { Ite_cont: newItem.Arb_cont, Ite_codi: "0", Ite_nomb: newItem.Arb_nomb, Tit_cont: 0 }
        newListOfItems.push(item);
      }
      //Se almacena el resultado del bucle para usarlo posteriormente
      this.ambientsPqr = newListOfItems;
    })
  }
  openTypesPqr(): void {
    //Se abre el modal de tipos de pqr
    let source: itemSource;
    source = { icon: 'text', items: this.typesPqr, title: 'Tipo de PQR' }
    let modal = this.modalCtrl.create(ItemsPage, { 'source': source })
    modal.present();
    modal.onDidDismiss((resp: item) => {
      this.pqr.ite_tpqr = resp.Ite_cont;
      this.typePqrSelected = resp.Ite_nomb;
    })
  }
  openAmbients(): void {
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
  onSubmit(f: NgForm) {
    this._sesion.GetLoggedin().then((user: user) => {
      this.pqr.soc_cont = user.Soc_cont;
      this.pqr.sbe_cont = user.Sbe_cont;
      this.pqr.inp_ncar = user.Mac_nume;
      this.pqr.mac_nume = user.Mac_nume1;
      this.pqr.ite_spre = 0;
      this.pqr.ite_ancu = 0;
      this._pqr.setPqr(this.pqr).then((resp: transaction) => {
        if (resp.ObjTransaction != null) {
          this._general.ShowMessageAlert('Pqr Creada!',`Se ha creado la PQR número ${resp.ObjTransaction.inp_cont}`);
          //Se limpian las 2 variables que no van enlazadas directamente a un input y que no va limpiar el .reset()
          this.ambientSelected="";
          this.typePqrSelected="";
          f.reset();
        }
      })
    })
  }
}
