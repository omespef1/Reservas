import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NetworkingMessagesPage } from './networking-messages';


@NgModule({
  declarations: [
    NetworkingMessagesPage,
  ],
  imports: [
    IonicPageModule.forChild(NetworkingMessagesPage),
  ],
})
export class NetworkingMessagesPageModule {}
