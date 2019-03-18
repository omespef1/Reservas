import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EventCotizProductsPage } from './event-cotiz-products';

@NgModule({
  declarations: [
    EventCotizProductsPage,
  ],
  imports: [
    IonicPageModule.forChild(EventCotizProductsPage),
  ],
})
export class EventCotizProductsPageModule {}
