import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NetworkingTermsPage } from './networking-terms';

@NgModule({
  declarations: [
    NetworkingTermsPage,
  ],
  imports: [
    IonicPageModule.forChild(NetworkingTermsPage),
  ],
})
export class NetworkingTermsPageModule {}
