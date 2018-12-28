import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MainTemplatesPage } from './main-templates';

@NgModule({
  declarations: [
    MainTemplatesPage,
  ],
  imports: [
    IonicPageModule.forChild(MainTemplatesPage),
  ],
})
export class MainTemplatesPageModule {}
