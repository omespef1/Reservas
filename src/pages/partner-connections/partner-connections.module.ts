import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PartnerConnectionsPage } from './partner-connections';

@NgModule({
  declarations: [
    PartnerConnectionsPage,
  ],
  imports: [
    IonicPageModule.forChild(PartnerConnectionsPage),
  ],
})
export class PartnerConnectionsPageModule {}
