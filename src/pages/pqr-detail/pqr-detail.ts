import { Component, ViewChild, ElementRef } from '@angular/core';
import { PopoverController, NavParams ,IonicPage,ViewController} from 'ionic-angular';
//Pages
import {PopOverPage} from '../pop-over/pop-over';
import { sessions } from '../../class/sessions/sessions';

/**
 * Generated class for the PqrDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-pqr-detail',
  templateUrl: 'pqr-detail.html',
})
export class PqrDetailPage {

  @ViewChild('popoverContent', { read: ElementRef }) content: ElementRef;
  @ViewChild('popoverText', { read: ElementRef }) text: ElementRef;
  trace:any={};



    constructor(private popoverCtrl: PopoverController,private nav:NavParams, private viewCtrl:ViewController,private _session:sessions) {
       this.trace = nav.get('trace');
    }

    presentPopover(ev) {

      let popover = this.popoverCtrl.create(PopOverPage, {
        contentEle: this.content.nativeElement,
        textEle: this.text.nativeElement
      });

      popover.present({
        ev: ev
      });
    }
close(){
  this.viewCtrl.dismiss();
}

}
