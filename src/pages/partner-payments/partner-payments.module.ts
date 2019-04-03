import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PartnerPaymentsPage } from './partner-payments';

@NgModule({
  declarations: [
    PartnerPaymentsPage,
  ],
  imports: [
    IonicPageModule.forChild(PartnerPaymentsPage),
  ],
})
export class PartnerPaymentsPageModule {}
