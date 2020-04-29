import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NetworkingProfilePage } from './networking-profile';

@NgModule({
  declarations: [
    NetworkingProfilePage,
  ],
  imports: [
    IonicPageModule.forChild(NetworkingProfilePage),
  ],
})
export class NetworkingProfilePageModule {}
