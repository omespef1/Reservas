import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PqrDetailPage } from './pqr-detail';

@NgModule({
  declarations: [
    PqrDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(PqrDetailPage),
  ],
})
export class PqrDetailPageModule {}
