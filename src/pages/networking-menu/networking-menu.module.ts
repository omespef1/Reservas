import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NetworkingMenuPage } from './networking-menu';

@NgModule({
  declarations: [
    NetworkingMenuPage,
  ],
  imports: [
    IonicPageModule.forChild(NetworkingMenuPage),
  ],
})
export class NetworkingMenuPageModule {}
