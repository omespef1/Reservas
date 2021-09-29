
import { Injectable } from '@angular/core';
import { ComunicationsProvider } from '../comunications/comunications';
import { sopernw, networkingPhoto } from '../../class/models/models';
import { tokens } from '../../class/models/models';

/*
  Generated class for the SopernwProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SopernwProvider {

  constructor(private _comu:ComunicationsProvider) {
    //console.log('Hello SopernwProvider Provider');
  }


  GetSoPernw(emp_codi:number,sbe_cont:number,soc_cont:number,mac_nume:string){
    return this._comu.Get(`SoPernw?emp_codi=${emp_codi}&sbe_cont=${sbe_cont}&soc_cont=${soc_cont}&mac_nume=${mac_nume}`,false,'',false)
  }

SetSoPernw(profile:sopernw){
  return this._comu.Post(profile,`SoPernw`,'',false);
}

UpdateSoPernw(profile:sopernw){
  return this._comu.Post(profile,`SoPernw/update`,'',false);
}

DeleteSoPernw(emp_codi:number,per_cont:number){
  return this._comu.Post({emp_codi:emp_codi,per_cont:per_cont},`sopernw/delete`)
}

GeSoPernw(emp_codi:number, per_tags:string,top:number){
  return this._comu.Get(`sopernw/GetSoPernw?emp_codi=${emp_codi}&per_tags=${per_tags}&top=${top}`,false,'',false)
  
}


GetPhoto(emp_codi:number, per_cont:number){
  return this._comu.Get(`SoPernw/GetPhoto?emp_codi=${emp_codi}&per_cont=${per_cont}`,false,'',false)
  
}


GetSoPernwByUuid(uuid:string){
  return this._comu.Get(`sopernw/GetSoPernwByUid?per_uuid=${uuid}`,false,'',false)
  
}

updateTokens(tokens:any){  
  return this._comu.Post({emp_codi:tokens.emp_codi,per_cont:tokens.per_cont,per_uuid:tokens.per_uuid, per_osid:tokens.per_osid},`SoPernw/UpdateTokens`,'',false)
}
updatePhoto(photo:networkingPhoto){
  return this._comu.Post(photo,`SoPernw/UpdatePhoto`,'',false);
  
}


}
