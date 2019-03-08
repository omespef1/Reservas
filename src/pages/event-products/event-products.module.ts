import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EventProductsPage } from './event-products';

@NgModule({
  declarations: [
    EventProductsPage,
  ],
  imports: [
    IonicPageModule.forChild(EventProductsPage),
  ],
})
export class EventProductsPageModule {}
