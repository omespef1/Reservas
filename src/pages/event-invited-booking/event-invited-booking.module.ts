import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EventInvitedBookingPage } from './event-invited-booking';

@NgModule({
  declarations: [
    EventInvitedBookingPage,
  ],
  imports: [
    IonicPageModule.forChild(EventInvitedBookingPage),
  ],
})
export class EventInvitedBookingPageModule {}
