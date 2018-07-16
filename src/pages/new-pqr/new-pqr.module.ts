import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewPqrPage } from './new-pqr';

@NgModule({
  declarations: [
    NewPqrPage,
  ],
  imports: [
    IonicPageModule.forChild(NewPqrPage),
  ],
})
export class NewPqrPageModule {}
