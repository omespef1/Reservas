import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AccommodationListPage } from './accommodation-list';

@NgModule({
  declarations: [
    AccommodationListPage,
  ],
  imports: [
    IonicPageModule.forChild(AccommodationListPage),
  ],
})
export class AccommodationListPageModule {}
