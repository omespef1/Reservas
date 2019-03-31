import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AccommodationSearchParamsPage } from './accommodation-search-params';

@NgModule({
  declarations: [
    AccommodationSearchParamsPage,
  ],
  imports: [
    IonicPageModule.forChild(AccommodationSearchParamsPage),
  ],
})
export class AccommodationSearchParamsPageModule {}
