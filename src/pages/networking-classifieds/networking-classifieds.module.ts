import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NetworkingClassifiedsPage } from './networking-classifieds';

@NgModule({
  declarations: [
    NetworkingClassifiedsPage,
  ],
  imports: [
    IonicPageModule.forChild(NetworkingClassifiedsPage),
  ],
})
export class NetworkingClassifiedsPageModule {}
