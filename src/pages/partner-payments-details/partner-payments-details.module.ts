import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PartnerPaymentsDetailsPage } from './partner-payments-details';

@NgModule({
  declarations: [
    PartnerPaymentsDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(PartnerPaymentsDetailsPage),
  ],
})
export class PartnerPaymentsDetailsPageModule {}
