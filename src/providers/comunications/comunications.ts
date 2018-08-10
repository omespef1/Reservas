import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {SERVICES_URL,appCentralizacionUrl} from '../../assets/config/config';
import {LoadingController,ToastController} from 'ionic-angular';
//clases
import {general} from '../../class/general/general';

/*
  Generated class for the ComunicationsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ComunicationsProvider {
  loading:any;
  constructor(public http: HttpClient,
     private load:LoadingController,
     private _general:general) {
  }

Get(UrlService:string,loading:boolean=true,content:string="Cargando..."){
  this.loading= this.load.create({
      content:content
    });
    let promise = new Promise((resolve,reject)=>{
      if(loading)
      this.loading.present();
      return this.http.get(SERVICES_URL + UrlService ).subscribe((resp:any)=>{
        console.log(resp);
        if(loading)
        this.loading.dismiss();
        if(resp.Retorno==1){
          this.ErrMessage(resp.TxtError);
          resp=null;
        }
        resolve(resp);
      },err=>{
        this.ErrMessage(err)
      });
    })
 return promise;
}

GetCentralizacion(){
  this.loading= this.load.create({
      content:'Consultando información de clientes...'
    });
    let promise = new Promise((resolve,reject)=>{
      this.loading.present();
      return this.http.get(appCentralizacionUrl).subscribe((resp:any)=>{
        this.loading.dismiss();
        if(resp.State==false){
          this.ErrMessage(resp.TxtError);
          resp=null;
        }
        resolve(resp);
      },err=>{
        this.ErrMessage(err)
      });
    })

 return promise;
}

Post(params:any, urlService:string,content:string="Cargando..."){
  this.loading= this.load.create({
      content:content,
    });
  let promise = new Promise((resolve,reject)=>{
    this.loading.present();
    console.log(SERVICES_URL+ urlService);
    console.log(params);
   return this.http.post(SERVICES_URL+ urlService,params).subscribe((resp:any)=>{
     this.loading.dismiss();
     console.log(resp)
     if(resp.Retorno==1){
       this.ErrMessage(resp.TxtError);
       resp=null;
     }
     resolve(resp);
   }),err=>{
     console.log('error');
     this.ErrMessage(err)    ;
   }
  })
return promise;
  // .subscribe(res=>{
  //
  // }),err=>{
  //   this.ErrMessage(err)
  // }
}


PostTest(urlService:string){
  this.loading= this.load.create({
      content:'Cargando...'
    });
  let promise = new Promise((resolve,reject)=>{
    this.loading.present();
   return this.http.post(urlService,null).subscribe((resp:any)=>{
     this.loading.dismiss();
     console.log(resp)
     if(resp.Retorno==1){
       this.ErrMessage(resp.TxtError);
       resp=null;
     }
     resolve(resp);
   }),err=>{
     console.log('error');
     this.ErrMessage(err)    ;
   }
  })
return promise;
  // .subscribe(res=>{
  //
  // }),err=>{
  //   this.ErrMessage(err)
  // }
};


 ErrMessage(msg:string) {
  this._general.showToastMessage(msg,'bottom');
}
}
