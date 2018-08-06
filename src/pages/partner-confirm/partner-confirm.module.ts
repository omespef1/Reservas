import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PartnerConfirmPage } from './partner-confirm';

@NgModule({
  declarations: [
    PartnerConfirmPage,
  ],
  imports: [
    IonicPageModule.forChild(PartnerConfirmPage),
  ],
})
export class PartnerConfirmPageModule {}
