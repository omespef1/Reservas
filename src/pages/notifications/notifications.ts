import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { NotificationsPushProvider } from '../../providers/notifications-push/notifications-push';
import { OSNotification, OSNotificationPayload } from '@ionic-native/onesignal/ngx';

/**
 * Generated class for the NotificationsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-notifications',
  templateUrl: 'notifications.html',
})
export class NotificationsPage {
 notification:any
  constructor(public navCtrl: NavController, public navParams: NavParams,private _view:ViewController) {

    this.notification = navParams.get('notification');
    console.log(this.notification.payload);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NotificationsPage');
  }

  close(){
    this._view.dismiss()
  }

}
