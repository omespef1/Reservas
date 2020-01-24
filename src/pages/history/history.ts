import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HistoryProvider } from '../../providers/history/history';
//clase
import {sessions} from '../../class/sessions/sessions';
import { general } from '../../class/general/general';
import { month } from '../../class/Models/models';

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
  histories: any[];
  user:any;
  myDate:string="";
  lastYears:number[]=[];
  year:number;
  month:number;
  dayI:number;
  dayF:number;
  daysInMonthI:number[]=[];
  daysInMonthF:number[]=[];
 months:month[]=[];
 

  constructor(private _history: HistoryProvider,private session:sessions,public _general:general) {


 
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
   
    let history: any = {Soc_cont: this.user.Soc_cont,Sbe_cont:this.user.Sbe_cont,fac_mesp: this.myDate.split('-')[1],fac_anop:this.myDate.split('-')[0]}; //Se debe definir como se crea este objeto para ir a traer los Consumos
   
   

    this._history.GetHistory(history).then((resp: any) => {
      if (resp != null) {
        this.histories = resp.ObjTransaction;
      }
    })
  }

  total(histories:any[]){
   return  histories.reduce((acc, pilot) => acc + pilot.Dvt_valo, 0);
  }

  loadDaysMonthI(){
    this.dayI=undefined;
    this.dayF=undefined;
    this.daysInMonthI =[];
    let totalDays =   this._general.daysInMonth(this.month,this.year);
    for(let i:number =1 ; i<= totalDays;i++){
      this.daysInMonthI.push(i);
    }
  }

    loadDaysMonthF(){
      this.dayF=undefined;
      this.daysInMonthF=[];
    let totalDays =   this._general.daysInMonth(this.month,this.year);
    for(let i:number =this.dayI ; i<= totalDays;i++){
      this.daysInMonthF.push(i);
    }
  }

  cleanAllControls(){
    this.year=undefined;
    this.daysInMonthI=[];
    this.daysInMonthF=[];     
    this.month= undefined;
    this.dayI=undefined;
    this.dayF=undefined;

  }

  cleanControls(){
    this.daysInMonthI=[];
    this.daysInMonthF=[];     
    this.month= undefined;
    this.dayI=undefined;
    this.dayF=undefined;
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


}
