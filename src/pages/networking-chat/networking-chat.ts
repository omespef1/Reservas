import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, PopoverController } from 'ionic-angular';

import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
/**
 * Generated class for the NetworkingChatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  template: `
    <ion-list no-lines>
      <button ion-item (click)="close()">Archive</button>
      <button ion-item (click)="close()">Delete</button>
      <button ion-item (click)="close()">Block</button>
      <button ion-item (click)="close()">Report problem</button>
    </ion-list>
  `
})
export class SinglePopover {
  constructor(private viewCtrl: ViewController) {}
  close() {
    this.viewCtrl.dismiss();
  }
}

@IonicPage()
@Component({
  selector: 'page-networking-chat',
  templateUrl: 'networking-chat.html',
})
export class NetworkingChatPage {
  messages:Array<any>

  constructor(private popoverCtrl: PopoverController) {
      this.messages = ["Hello", "world", "again"];
  }

  presentPopover(event) {
      let popover = this.popoverCtrl.create(SinglePopover);
      popover.present({
          ev: event
      });
  }
}
