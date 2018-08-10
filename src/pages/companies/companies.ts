import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';
//providers
import {CompaniesProvider} from '../../providers/companies/companies';
//clases
import {sessions} from '../../class/sessions/sessions';

/**
 * Generated class for the BusinessPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-companies',
  templateUrl: 'companies.html',
})
export class CompaniesPage {
  business:any[];
  businessList:any[];
  constructor(private navCtrl: NavController, private navParams: NavParams,private _companies:CompaniesProvider,
  private viewCtrl:ViewController,
private _sesion:sessions) {
      this.loadCompanies();
  }
  loadCompanies(){
    this._sesion.GetCompanies().then((resp:any)=>{
         if(resp){
           //Si las empresas ya están en sesion las carga en la pantalla tomándolas de la sesion
           this.business = resp;
           this.businessList=resp;
         }
         else {
           //Si las empresas no están en sesion las carga de la base de datos
           this._companies.GetGnEmpre().then((data:any)=>{
             if(data!=null){
                 this.business = data;
                 this.businessList = data;
               }
             })
         }
    })

  }
  ionViewDidLoad() {
    this.initializeItems();
    console.log('ionViewDidLoad BusinessPage');
  }
  initializeItems(): void {
   this.businessList = this.business;
  }
  closeLupa(client:any){
    this.viewCtrl.dismiss(client);
  }
  getItems(q: string) {
  //Reseteo los items a su estado original
  this.initializeItems();
  //Si el valor es vacío ni filtra ndada
  if (!q || q.trim() === '') {
  return;
  }
  //Realiza el filtrado
  this.businessList = this.businessList.filter((v) =>  v.Emp_Nomb.toLowerCase().indexOf(q.toLowerCase()) > -1 || v.Emp_Codi.toString().indexOf(q.toLowerCase()) > -1 );
  }
}
