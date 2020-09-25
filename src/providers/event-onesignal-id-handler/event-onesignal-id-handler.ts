import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ComunicationsProvider } from '../comunications/comunications';
import { notificationIdHandler } from '../../class/models/notifications/notifications';

/*
  Generated class for the EventOnesignalIdHandlerProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class EventOnesignalIdHandlerProvider {

  constructor(private http:ComunicationsProvider) {
  
  }


  GetAllNotificationsId(emp_codi:number,ter_codi:number){
    return this.http.Get(`GnRteno?emp_codi=${emp_codi}&ter_codi=${ter_codi}`);
  }

PostNewNotificationId(notificationId:notificationIdHandler){
  return this.http.Post(notificationId,`GnRteno/Post`,'',false);
}

deleteNotificationId(notificationId:notificationIdHandler){
  return this.http.Post(notificationId,`GnRteno/Update`,'',false);
}

}
