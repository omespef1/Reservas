import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VersioningPage } from './versioning';

@NgModule({
  declarations: [
    VersioningPage,
  ],
  imports: [
    IonicPageModule.forChild(VersioningPage),
  ],
})
export class VersioningPageModule {}
