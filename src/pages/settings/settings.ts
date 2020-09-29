import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Events, Platform } from 'ionic-angular';
import { sessions } from '../../class/sessions/sessions';
//pages
import { PartnerDetailPage } from '../partner-detail/partner-detail';
import { AboutPage } from '../about/about';
import { PartnerPaymentsPage } from '../partner-payments/partner-payments';
import { EventOnesignalIdHandlerProvider } from '../../providers/event-onesignal-id-handler/event-onesignal-id-handler';
import { notificationIdHandler } from '../../class/models/notifications/notifications';
import { transaction } from '../../class/models/models';


/**
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {
  user: any = {};
  constructor(private _sessions: sessions,
    private _modalCtrl: ModalController,
    private _events: Events,
    private navCtrl: NavController,
    private _platform:Platform,
    private _oneSignalId:EventOnesignalIdHandlerProvider) {
    this._sessions.GetLoggedin().then(user => {
      this.user = user;
    })
  }

  showPartnerDetail(partner: any) {
    let modal = this._modalCtrl.create(PartnerDetailPage, { 'user': partner });
    modal.present();
  }
  async sessionOut() {
    let oneSignalData:any = await this._sessions.getOneSignalIds();
    let notification= new notificationIdHandler();
    notification.emp_codi = this._sessions.GetClientEmpCodi(),
    notification.rte_osid = oneSignalData==undefined?"0":oneSignalData.userId;
    notification.ter_codi = this.user.Ter_Codi;      
    this._oneSignalId.deleteNotificationId(notification).then((resp:transaction)=>{
      if(resp.Retorno==0){
        console.log('oneSingal Id eliminado');
      }
    })
    this._events.publish('user:logout');
  }
  GoAbout() {
    this.navCtrl.push(AboutPage);
  }
  Errase() {
    this._sessions.erraseAlldata();
    this._events.publish('user:logout');
  }
  seePayments(){
  this.navCtrl.push(PartnerPaymentsPage);
  }

  ShowDeveloper(){
    if(!this._platform.is('cordova')){
        
    }
  }
}
