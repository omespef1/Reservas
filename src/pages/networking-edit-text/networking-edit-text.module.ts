import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NetworkingEditTextPage } from './networking-edit-text';

@NgModule({
  declarations: [
    NetworkingEditTextPage,
  ],
  imports: [
    IonicPageModule.forChild(NetworkingEditTextPage),
  ],
})
export class NetworkingEditTextPageModule {}
