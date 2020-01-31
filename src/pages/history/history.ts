import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Form, ModalController } from 'ionic-angular';
import { HistoryProvider } from '../../providers/history/history';
//clase
import {sessions} from '../../class/sessions/sessions';
import { general } from '../../class/general/general';
import { month, user, transaction, ambiente, consumo, detalleConsumo } from '../../class/models/models';
import { NgForm } from '@angular/forms';
import { HistoryDetailPage } from '../history-detail/history-detail';

/**
 * Generated class for the HistoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */




@IonicPage()
@Component({
  selector: 'page-history',
  templateUrl: 'history.html',
})
export class HistoryPage {
  histories: consumo[];
  user:user;
  myDate:string="";
  lastYears:number[]=[];
  year:number;
  month:number=0;
   dayI:number=0;
  dayF:number=0;
  daysInMonthI:number[]=[];
  daysInMonthF:number[]=[];
  emp_codi:number;
 months:month[]=[];
 ambientesSource:ambiente[];
 ambienteS:number=0;
 

  constructor(private _history: HistoryProvider,private session:sessions,public _general:general,private _modal:ModalController) {

  this.emp_codi = this.session.GetClientEmpCodi();
 
  }
  ionViewDidLoad() {
    this.session.GetLoggedin().then(resp => {
      this.user = resp;
      // this.GetHistory();
    })

    this.lastYears = this._general.GetLastYears(new Date(),5);
    this.loadMonths();
  }

  GetHistory() {
   
    // let history: any = {Soc_cont: this.user.Soc_cont,Sbe_cont:this.user.Sbe_cont,fac_mesp: this.myDate.split('-')[1],fac_anop:this.myDate.split('-')[0]}; //Se debe definir como se crea este objeto para ir a traer los Consumos
   
    
    this._history.GetHistory(this.emp_codi,this.user.Soc_cont,this.user.Sbe_cont,this.user.Mac_nume,this.month,this.year,this.dayI,this.dayF,this.ambienteS).then((resp: any) => {
      if (resp != null) {
        console.log(resp);
        this.histories = resp.ObjTransaction;
      }
      else{
        this.histories=null;
      }
    })
  }

  // total(histories:any[]){
  //  return  histories.reduce((acc, pilot) => acc + pilot.Dvt_valo, 0);
  // }

  loadDaysMonthI(){
    // this.dayI=undefined;
    // this.dayF=undefined;
    this.daysInMonthI =[];
    let totalDays =   this._general.daysInMonth(this.month,this.year);
    for(let i:number =1 ; i<= totalDays;i++){
      this.daysInMonthI.push(i);
    }
  }

  loadDays(){
    if(this.year>0 && this.month>0){
      this.loadDaysMonthI();
      this.loadDaysMonthF();
    }
  }

    loadDaysMonthF(){   
      this.daysInMonthF=[];
    let totalDays =   this._general.daysInMonth(this.month,this.year);
    for(let i:number =this.dayI ; i<= totalDays;i++){
      this.daysInMonthF.push(i);
    }
  }

  cleanAllControls(){    
    this.daysInMonthI=[];
    this.daysInMonthF=[];  
    this.dayI=0;
    this.dayF=0;
    this.ambientesSource=[];   
    this.months=[];
    this.month=0;
    this.loadMonths();
   

  }

  cleanControls(form:NgForm){
    // form.reset();
    // this.daysInMonthI=[];
    // this.daysInMonthF=[];     
    // this.month= null;
    // this.dayI=undefined;
    // this.dayF=undefined;
  }


 loadMonths(){
  console.log('load months');
  
  this.months = [

    {  monthName:'Enero',monthValue:1},
    {  monthName:'Febrero',monthValue:2},
    {  monthName:'Marzo',monthValue:3},
    {  monthName:'Abril',monthValue:4},
    {  monthName:'Mayo',monthValue:5},
    {  monthName:'Junio',monthValue:6},
    {  monthName:'Julio',monthValue:7},
    {  monthName:'Agosto',monthValue:8},
    {  monthName:'Septiembre',monthValue:9},
    {  monthName:'Octubre',monthValue:10},
    {  monthName:'Noviembre',monthValue:11},
    {  monthName:'Diciembre',monthValue:12},  
      ]
 }


 GetAmbientes(){
   this._history.GetAmbientes(this.emp_codi,this.user.Soc_cont,this.user.Sbe_cont,this.user.Mac_nume,this.month,this.year).then((resp:transaction)=>{
    if(resp!=null){
        this.ambientesSource = resp.ObjTransaction;
    }
    else {
      this.resetAmbients();
    }
   })
 }

 ShowDetail(detail:detalleConsumo){
  let modal = this._modal.create(HistoryDetailPage,{'detalle': detail });
  modal.present();
 }

 resetAmbients(){
   this.ambientesSource=[];
   this.ambienteS=0;
 }


 


}
