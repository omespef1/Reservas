import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NavController } from 'ionic-angular'
//pages
import { TabsPage } from '../../pages/tabs/tabs';
//config
import { GnConex } from '../../class/models/models';
import { KeychainTouchId } from '@ionic-native/keychain-touch-id';
//models
import { bookingInfo } from '../Models/models';
import { resolveDefinition } from '@angular/core/src/view/util';

@Injectable()

export class sessions {
  public clientUrl: string;
  public emp_codi: number;
  constructor(private nativeStorage: Storage, private _touch: KeychainTouchId) {
  }
  //Setea la sesión cuando se loguea un usuario
  setLoggedIn(user: any) {
    console.log(user);
    this.nativeStorage.set('loggedUser', user);
  }
  GetLoggedin() {
    return this.nativeStorage.get('loggedUser');
  }
  removeSession() {
    this.nativeStorage.remove('loggedUser');
    this.nativeStorage.remove('reasonsPqr');
    this.nativeStorage.remove('ambientPqr');
  }
  erraseAlldata() {
    this.nativeStorage.remove('secureUser');
    this.nativeStorage.remove('EmpCodi');
    this.nativeStorage.remove('partnerConnection');
    this.nativeStorage.remove('companies');
    this._touch.delete('fingerprint');

  }
  setReasonsPrq(reasons: any) {
    this.nativeStorage.set('reasonsPqr', reasons);
  }
  setUserFingerPrint(user: string) {
    this.nativeStorage.set('secureUser', user);
  }
  getUserFingerPrint() {
    return this.nativeStorage.get('secureUser');
  }

  getReasonsPqr() {
    return this.nativeStorage.get('reasonsPqr');
  }
  setAmbientPqr(reasons: any) {
    this.nativeStorage.set('ambientPqr', reasons);
  }
  getAmbientPqr() {
    return this.nativeStorage.get('ambientPqr');
  }
  getPartnerConnections(): Promise<GnConex> {
    return this.nativeStorage.get('partnerConnection');
  }
  setPartnerConnections(conex: GnConex) {
    this.nativeStorage.set('partnerConnection', conex);
    this.SetClientUrl(conex.CNX_IPSR);
  }

  getEmpCodiSession(): Promise<number> {
    return this.nativeStorage.get('EmpCodi');
  }
  setEmpCodiSession(EmpCodi: number) {
    this.nativeStorage.set('EmpCodi', EmpCodi);
  }


  GetClientUrl() {
    //return this.clientUrl;
    return 'http://186.154.240.180/APPS/Desarrollo/Reservas/api/';
  }
  SetClientUrl(value: string) {
    this.clientUrl = value;
  }
  GetClientEmpCodi() {
    return 102;
    //return this.emp_codi;
  }
  SetClientEmpCodi(value: number) {
    this.emp_codi = value;
  }
  SetCompanies(companies) {
    this.nativeStorage.set('companies', companies);
  }
  GetCompanies() {
    return this.nativeStorage.get('companies');
  }

  //Añade items al carrito de compra
  addShoppingList(newBooking: bookingInfo) {
    this.nativeStorage.get('shoppingList').then((bookingList: bookingInfo[]) => {
      if (bookingList != null && bookingList != undefined && bookingList.length > 0) {
        if (bookingList.filter(b => b.Res_cont == newBooking.Res_cont).length == 0) {
          console.log('agregada');
          bookingList.push(newBooking);
          this.nativeStorage.set('shoppingList', bookingList);
        }
      }
      else {
        let bookingList: bookingInfo[] = [];
        bookingList.push(newBooking);
        this.nativeStorage.set('shoppingList', bookingList);
      }
    });
  }
  //Verifica si ya un item está en el carrito para no añadirlo 2 veces
  async verifyCarShopping(booking: bookingInfo) {
    const listaS: any[] = <any[]>await this.getShoppingList()
    console.log('Verificando carrito de compra...')
    if (listaS != null && listaS != undefined && listaS.length > 0) {
      if (listaS.filter(b => b.Res_cont == booking.Res_cont).length > 0) {
        console.log('deshabilitar')
        return true;
      }
      return false;
    }
    else {
      return true;
    }
  }
  //Obtiene la lista de items en el carrito de compra
  getShoppingList() {
    return this.nativeStorage.get('shoppingList');
  }

  removeFromShoppingList(booking:bookingInfo){
   return this.getShoppingList().then((items:bookingInfo[])=>{
       if(items!=null&&items.length>0){
         items = items.filter(i=>i.Res_cont != booking.Res_cont);
         this.nativeStorage.set('shoppingList',items);         
       }
    })
  }
}
