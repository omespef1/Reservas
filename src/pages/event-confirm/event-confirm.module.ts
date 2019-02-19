import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EventConfirmPage } from './event-confirm';

@NgModule({
  declarations: [
    EventConfirmPage,
  ],
  imports: [
    IonicPageModule.forChild(EventConfirmPage),
  ],
})
export class EventConfirmPageModule {}
