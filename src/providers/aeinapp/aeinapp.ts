import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ComunicationsProvider } from "../comunications/comunications";
import { aeinapp, user } from "../../class/models/models";
import { sessions } from "../../class/sessions/sessions";
import { general } from '../../class/general/general';

/*
  Generated class for the AeinappProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AeinappProvider {
  constructor(private _comu: ComunicationsProvider, private _sesion: sessions,private _general:general) {
    console.log("Hello AeinappProvider Provider");
  }
  async SetAeInApp() {
    let log = new aeinapp();
    let user: user = <user>await this._sesion.GetLoggedin();
    log = {
      emp_codi: <number>await this._sesion.getEmpCodiSession(),
      soc_cont: user.Soc_cont,
      mac_nume: user.Mac_nume1,
      sbe_cont: user.Sbe_cont,
      aud_esta: "",
      aud_ufac: new Date(),
      aud_usua: "",
      coa_anop: 0,
      coa_cont: 0,
      coa_fech: new Date(),
      coa_mesp: 0,
      pla_cont: 0,
      pla_codi: this._general.GetPlatform()
    };
    return this._comu.Post(log, "aeinapp", "", false);
  }
}
