import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EventCotizDetailPage } from './event-cotiz-detail';

@NgModule({
  declarations: [
    EventCotizDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(EventCotizDetailPage),
  ],
})
export class EventCotizDetailPageModule {}
