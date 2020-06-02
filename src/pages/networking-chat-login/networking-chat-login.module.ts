import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NetworkingChatLoginPage } from './networking-chat-login';

@NgModule({
  declarations: [
    NetworkingChatLoginPage,
  ],
  imports: [
    IonicPageModule.forChild(NetworkingChatLoginPage),
  ],
})
export class NetworkingChatLoginPageModule {}
