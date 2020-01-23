import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BookingInvitedsPage } from './booking-inviteds';

@NgModule({
  declarations: [
    BookingInvitedsPage,
  ],
  imports: [
    IonicPageModule.forChild(BookingInvitedsPage),
  ],
})
export class BookingInvitedsPageModule {}
