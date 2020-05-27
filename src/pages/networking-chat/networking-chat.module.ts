import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NetworkingChatPage } from './networking-chat';

@NgModule({
  declarations: [
    NetworkingChatPage,
  ],
  imports: [
    IonicPageModule.forChild(NetworkingChatPage),
  ],
})
export class NetworkingChatPageModule {}
