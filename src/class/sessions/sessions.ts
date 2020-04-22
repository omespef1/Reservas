import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NavController, Platform } from 'ionic-angular'
//pages
import { TabsPage } from '../../pages/tabs/tabs';
//config
import { GnConex, ae_param } from '../../class/models/models';
import { KeychainTouchId } from '@ionic-native/keychain-touch-id';
//models
import { bookingInfo, disponibilityRequestEvent } from '../models/models';
import { resolveDefinition } from '@angular/core/src/view/util';
import { platformBrowser } from '@angular/platform-browser';
import { stringify } from '@angular/core/src/util';


//terminar de hacer la vconversion cuando es cordova https

@Injectable()

export class sessions {
  public clientUrl: string;
  public emp_codi: number;

  public aeparam: ae_param;
  constructor(private nativeStorage: Storage, private _touch: KeychainTouchId, private _platform: Platform) {
  }
  //Setea la sesión cuando se loguea un usuario
  setLoggedIn(user: any) {

    this.nativeStorage.set('loggedUser', user);
  }
  GetLoggedin() {
    return this.nativeStorage.get('loggedUser');
  }
  removeSession() {
    // this.nativeStorage.remove('loggedUser');
    // this.nativeStorage.remove('reasonsPqr');
    // this.nativeStorage.remove('ambientPqr');
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

     //return 'http://132.147.157.140/SevenReservas/api/';
    // return 'http://186.154.240.181/Nogalapi/api/';
    //return 'http://localhost/SevenReservas/api/';
  //   return 'http://192.168.1.209/appnogal/api/';
  // return 'https://erp.clubelnogal.com/appnogal/api/';
    // Le quita el https a la url configurada por el cliente. Esta medida se ejecutará mientras se pueda resolver en tema de funcionamiento https sobre apps
    // if (this._platform.is("cordova") && this.clientUrl.indexOf("https") > -1) {
    //   let urlUnsafe: string = this.clientUrl.replace("https", "http");
    //   return urlUnsafe;
    // }
    // else
  return this.clientUrl;
  }

  SetClientUrl(value: string) {
    this.clientUrl = value;
  }
  GetClientEmpCodi() {
    //return 102;
    // console.log('obtiene el tercero guardado');
     return this.emp_codi;
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

  SetEventQuantity(cant: Number) {
    this.nativeStorage.set("eventQuantity", cant)
  }

  GetEventQuantity(): Promise<number> {
    return this.nativeStorage.get('eventQuantity');
  }

  //Añade items al carrito de compra
  async addShoppingList(newBooking: bookingInfo) {
    let bookingList: bookingInfo[] = <bookingInfo[]>await this.nativeStorage.get('shoppingList');
    if (bookingList != null && bookingList != undefined && bookingList.length > 0) {
      if (bookingList.filter(b => b.Res_cont == newBooking.Res_cont).length == 0) {

        bookingList.push(newBooking);
        let ok = await this.nativeStorage.set('shoppingList', bookingList);
        return ok;
      }
    }
    else {
      let bookingList: bookingInfo[] = [];
      bookingList.push(newBooking);
      let ok = await this.nativeStorage.set('shoppingList', bookingList);
      return ok;
    }
  }


  //Verifica si ya un item está en el carrito para no añadirlo 2 veces
  async verifyCarShopping(booking: bookingInfo) {
    const listaS: any[] = <any[]>await this.getShoppingList()

    if (listaS != null && listaS != undefined && listaS.length > 0) {
      if (listaS.filter(b => b.Res_cont == booking.Res_cont).length > 0) {

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
  //Elimina un item del carrito de compra
  removeFromShoppingList(booking: bookingInfo) {
    return this.getShoppingList().then((items: bookingInfo[]) => {
      if (items != null && items.length > 0) {
        items = items.filter(i => i.Res_cont != booking.Res_cont);
        this.nativeStorage.set('shoppingList', items);
      }
    })
  }
  removeCar() {
    this.nativeStorage.remove('shoppingList');
  }
  getAvailableBiometric() {
    return this._touch.isAvailable();
  }

  setAeParam(param: ae_param) {

    this.aeparam = param;
  }
  getAeParam() {

    return this.aeparam;
  }

  // setDeveloperOptions(developerOptions:boolean){
  //   this.nativeStorage.set("DeveloperOptions",developerOptions); 
  // }
  //  getDeveloperOptions(){
  //    this.nativeStorage.get("DeveloperOptions");
  //  }
}
