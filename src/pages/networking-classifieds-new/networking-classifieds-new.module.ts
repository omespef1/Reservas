import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NetworkingClassifiedsNewPage } from './networking-classifieds-new';

@NgModule({
  declarations: [
    NetworkingClassifiedsNewPage,
  ],
  imports: [
    IonicPageModule.forChild(NetworkingClassifiedsNewPage),
  ],
})
export class NetworkingClassifiedsNewPageModule {}
