import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NetworkingImageViewerPage } from './networking-image-viewer';

@NgModule({
  declarations: [
    NetworkingImageViewerPage,
  ],
  imports: [
    IonicPageModule.forChild(NetworkingImageViewerPage),
  ],
})
export class NetworkingImageViewerPageModule {}
