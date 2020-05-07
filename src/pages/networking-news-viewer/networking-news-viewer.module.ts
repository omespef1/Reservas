import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NetworkingNewsViewerPage } from './networking-news-viewer';

@NgModule({
  declarations: [
    NetworkingNewsViewerPage,
  ],
  imports: [
    IonicPageModule.forChild(NetworkingNewsViewerPage),
  ],
})
export class NetworkingNewsViewerPageModule {}
