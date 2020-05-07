import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NetworkingNewsPage } from './networking-news';

@NgModule({
  declarations: [
    NetworkingNewsPage,
  ],
  imports: [
    IonicPageModule.forChild(NetworkingNewsPage),
  ],
})
export class NetworkingNewsPageModule {}
