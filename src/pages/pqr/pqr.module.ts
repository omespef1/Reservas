import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PqrPage } from './pqr';

@NgModule({
  declarations: [
    PqrPage,
  ],
  imports: [
    IonicPageModule.forChild(PqrPage),
  ],
})
export class PqrPageModule {}
