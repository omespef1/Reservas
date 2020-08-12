import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NetworkingClassifiedViewerPage } from './networking-classified-viewer';

@NgModule({
  declarations: [
    NetworkingClassifiedViewerPage,
  ],
  imports: [
    IonicPageModule.forChild(NetworkingClassifiedViewerPage),
  ],
})
export class NetworkingClassifiedViewerPageModule {}
