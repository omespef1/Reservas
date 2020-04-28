import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NetworkingSearchPage } from './networking-search';

@NgModule({
  declarations: [
    NetworkingSearchPage,
  ],
  imports: [
    IonicPageModule.forChild(NetworkingSearchPage),
  ],
})
export class NetworkingSearchPageModule {}
