import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ThirdPartiesPage } from './third-parties';

@NgModule({
  declarations: [
    ThirdPartiesPage,
  ],
  imports: [
    IonicPageModule.forChild(ThirdPartiesPage),
  ],
})
export class ThirdPartiesPageModule {}
