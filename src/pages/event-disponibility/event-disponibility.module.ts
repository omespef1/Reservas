import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EventDisponibilityPage } from './event-disponibility';

@NgModule({
  declarations: [
    EventDisponibilityPage,
  ],
  imports: [
    IonicPageModule.forChild(EventDisponibilityPage),
  ],
})
export class EventDisponibilityPageModule {}
