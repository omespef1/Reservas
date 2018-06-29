import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PartnerDetailPage } from './partner-detail';

@NgModule({
  declarations: [
    PartnerDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(PartnerDetailPage),
  ],
})
export class PartnerDetailPageModule {}
