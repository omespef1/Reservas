import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NetworkingMyClassifiedsPage } from './networking-my-classifieds';

@NgModule({
  declarations: [
    NetworkingMyClassifiedsPage,
  ],
  imports: [
    IonicPageModule.forChild(NetworkingMyClassifiedsPage),
  ],
})
export class NetworkingMyClassifiedsPageModule {}
