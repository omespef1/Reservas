import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { appCentralizacionUrl } from '../../assets/config/config';
import { LoadingController, ToastController } from 'ionic-angular';
//clases
import { general } from '../../class/general/general';
import { sessions } from '../../class/sessions/sessions';

/*
  Generated class for the ComunicationsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ComunicationsProvider {
  loading: any;
  constructor(public http: HttpClient,
    private load: LoadingController,
    private _general: general,
    private _sesion: sessions) {


  }
  x
  Get(UrlService: string, loading: boolean = true, content: string = "Cargando...", requiteEmpCodi = true) {
    this.loading = this.load.create({
      content: content,
      spinner: 'ios'
    });
    let promise = new Promise((resolve, reject) => {
      if (loading)
        this.loading.present();
      let stringUrl = `${this._sesion.GetClientUrl()}${UrlService}`;
      if (requiteEmpCodi)
        stringUrl += `&emp_codi=${this._sesion.GetClientEmpCodi()}`;
        console.log(stringUrl);
      return this.http.get(stringUrl).retryWhen(error => {
        return error
          .flatMap((error: any) => {
            if (error.status === 503) {
              return Observable.of(error.status).delay(1000)
            }
            return Observable.throw({ error: `Servicio no disponible. Error ${error.status}` });
          })
          .take(5)
          .concat(Observable.throw({ error: `Hubo un error conectando con el servidor, contacte con su administrador` }));
      })
        .subscribe((resp: any) => {
          console.log(stringUrl);
          console.log(resp);
          if (loading)
            this.loading.dismiss();
          if (resp.Retorno == 1) {
            this.ErrMessage(resp.TxtError);
            resp = null;
          }
          resolve(resp);
        }, (err: HttpErrorResponse) => {
          console.log(err);
          this.ErrMessage(err.error);
          if (loading)
            this.loading.dismiss();
        })
    })
    return promise;
  }

  GetCentralizacion(target: string, contentText: string = "",loading:boolean=true) {

    if (contentText == "")
      contentText = "Consultando información de clientes...";
      if(loading){
        this.loading = this.load.create({
          content: contentText,
          spinner: 'ios'
        });
      }
    let promise = new Promise((resolve, reject) => {
      if(loading)
      this.loading.present();
      console.log(`${appCentralizacionUrl}${target}`);
      return this.http.get(`${appCentralizacionUrl}${target}`).retryWhen(error => {
        return error
          .flatMap((error: any) => {
            if (error.status === 503) {
              return Observable.of(error.status).delay(1000)
            }
            return Observable.throw({ error: `Servicio no disponible. Error ${error.status}` });
          })
          .take(5)
          .concat(Observable.throw({ error: `Hubo un error conectando con el servidor, contacte con su administrador` }));
      })
        .subscribe((resp: any) => {
          if(loading)
          this.loading.dismiss();
          if (resp.State == false) {
            this.ErrMessage(resp.TxtError);
            resp = null;
          }
          resolve(resp);
        }, (err: HttpErrorResponse) => {
          
          this.ErrMessage(err.error);
          console.log(err);
          if(loading)
          this.loading.dismiss();
        })
    })

    return promise;
  }

  Post(params: any, urlService: string, content: string = "Cargando...") {
    this.loading = this.load.create({
      content: content,
      spinner: 'ios'
    });
    let promise = new Promise((resolve, reject) => {
      this.loading.present();
      console.log(this._sesion.GetClientUrl() + urlService);
      console.log(params);
      return this.http.post(this._sesion.GetClientUrl() + urlService, params).retryWhen(error => {
        return error
          .flatMap((error: any) => {
            if (error.status === 503) {
              return Observable.of(error.status).delay(1000)
            }
            return Observable.throw({ error: `Servicio no disponible. Error ${error.status}` });
          })
          .take(5)
          .concat(Observable.throw({ error: `Hubo un error conectando con el servidor, contacte con su administrador` }));
      })

        .subscribe((resp: any) => {
          this.loading.dismiss();
          console.log(resp)
          if (resp.Retorno == 1) {
            this.ErrMessage(resp.TxtError);
            resp = null;
          }
          resolve(resp);
        }, (err: HttpErrorResponse) => {
          console.log(err);
          this.ErrMessage(err.error);
          this.loading.dismiss();
        })
    });
    
    
    return promise;
  }

  Put(params: any, urlService: string, content: string = "Cargando...") {
    this.loading = this.load.create({
      content: content,
      spinner: 'ios'
    });
    let promise = new Promise((resolve, reject) => {
      this.loading.present();
      console.log(this._sesion.GetClientUrl() + urlService);
      console.log(params);
      return this.http.put(this._sesion.GetClientUrl() + urlService, params).retryWhen(error => {
        return error
          .flatMap((error: any) => {
            if (error.status === 503) {
              return Observable.of(error.status).delay(1000)
            }
            return Observable.throw({ error: `Servicio no disponible. Error ${error.status}` });
          })
          .take(5)
          .concat(Observable.throw({ error: `Hubo un error conectando con el servidor, contacte con su administrador` }));
      })

        .subscribe((resp: any) => {
          this.loading.dismiss();
          console.log(resp)
          if (resp.Retorno == 1) {
            this.ErrMessage(resp.TxtError);
            resp = null;
          }
          resolve(resp);
        }, (err: HttpErrorResponse) => {
          console.log(err);
          this.ErrMessage(err.error);
          this.loading.dismiss();
        })
    });
    
    
    return promise;
  }
  ErrMessage(msg: string) {
    this._general.showToastMessage(msg, 'bottom');
  }


  


}
