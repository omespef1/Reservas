import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NetworkingProyectViewerPage } from './networking-proyect-viewer';

@NgModule({
  declarations: [
    NetworkingProyectViewerPage,
  ],
  imports: [
    IonicPageModule.forChild(NetworkingProyectViewerPage),
  ],
})
export class NetworkingProyectViewerPageModule {}
