import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ConfirmEventPage } from './confirm-event';

@NgModule({
  declarations: [
    ConfirmEventPage,
  ],
  imports: [
    IonicPageModule.forChild(ConfirmEventPage),
  ],
})
export class ConfirmEventPageModule {}
