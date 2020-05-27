import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NetworkingFavoritesPage } from './networking-favorites';

@NgModule({
  declarations: [
    NetworkingFavoritesPage,
  ],
  imports: [
    IonicPageModule.forChild(NetworkingFavoritesPage),
  ],
})
export class NetworkingFavoritesPageModule {}
