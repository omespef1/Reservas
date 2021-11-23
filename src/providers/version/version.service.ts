import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { appAppStoreUrl, appGooglePlayUrl, appVersion } from '../../assets/config/config';
import { ComunicationsProvider } from "../comunications/comunications";
import { transaction, transactionT } from '../../class/models/models';
import { general } from '../../class/general/general';
import { Platform } from 'ionic-angular';



@Injectable()
export class AppVersionService {

    constructor(private _comu: ComunicationsProvider, private generalService: general, private platform: Platform) {
        //console.log('Hello SoFanetProvider Provider');
    }
    private GetAppVersionFromServer() {
        try {
            return this._comu.Get(`Version`, false, '', false);
        } catch (error) {
            
        }
       
    }


    async checkUpdatesApp() {  
     let resp:transactionT<string> =  <transactionT<string>>  await   this.GetAppVersionFromServer();
        if (resp.ObjTransaction != null && resp.Retorno == 0) {
            if (this.compareVersion(appVersion, resp.ObjTransaction) < 0) {
                this.GoUpdateApp();
                return false;
            }
            return true;


        }

    }


    private GoUpdateApp() {
        this.generalService
            .ShowMessageAlertAction(
                "Actualización Disponible",
                "Hay una nueva versión disponible de esta aplicación. Presiona aceptar para ir a la tienda y actualizar."
            )
            .then(() => {
                if (this.platform.is("ios")) this.generalService.openUrl(appAppStoreUrl);
                if (this.platform.is("android"))
                    this.generalService.openUrl(appGooglePlayUrl);
            });
    }


    private compareVersion(v1, v2) {
        if (typeof v1 !== "string") return false;
        if (typeof v2 !== "string") return false;
        v1 = v1.split(".");
        v2 = v2.split(".");
        const k = Math.min(v1.length, v2.length);
        for (let i = 0; i < k; ++i) {
            v1[i] = parseInt(v1[i], 10);
            v2[i] = parseInt(v2[i], 10);
            if (v1[i] > v2[i]) return 1;
            if (v1[i] < v2[i]) return -1;
        }
        return v1.length == v2.length ? 0 : v1.length < v2.length ? -1 : 1;
    }

}






