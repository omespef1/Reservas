import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InstitutionalPage } from './institutional';

@NgModule({
  declarations: [
    InstitutionalPage,
  ],
  imports: [
    IonicPageModule.forChild(InstitutionalPage),
  ],
})
export class InstitutionalPageModule {}
