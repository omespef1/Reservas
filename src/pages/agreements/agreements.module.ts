import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AgreementsPage } from './agreements';

@NgModule({
  declarations: [
    AgreementsPage,
  ],
  imports: [
    IonicPageModule.forChild(AgreementsPage),
  ],
})
export class AgreementsPageModule {}
