import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AccommodationConfirmationProvider } from '../../providers/accommodation-confirmation/accommodation-confirmation';
import { booking, transaction } from '../../class/models/models';
import * as moment from 'moment';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';


/**
 * Generated class for the AccomodationConfirmationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-accomodation-confirmation',
  templateUrl: 'accomodation-confirmation.html',
})
export class AccomodationConfirmationPage {


  total:number=0;
  
  AccommodationBooking: booking;
  constructor(public navCtrl: NavController, public navParams: NavParams,private _provider:AccommodationConfirmationProvider) {
    this.AccommodationBooking = this.navParams.get('accomodation');  
  }



  ionViewDidLoad() {
    this.GetValueSpaces();
  }

  GetValueSpaces(){
      this._provider.GetValuesSpaces(this.AccommodationBooking).then((resp:transaction)=>{
        if(resp!=null){
          this.AccommodationBooking.AccomodationSpaces = resp.ObjTransaction;
        }
      })
  }

  GetDifferenceInDays():number{
    let start = moment(this.AccommodationBooking.Res_fini, "YYYY-MM-DD");
    let end = moment(this.AccommodationBooking.Res_fina, "YYYY-MM-DD");

//Difference in number of days
   return moment.duration(end.diff(start)).asDays();

  }

  GetTotal(){
    return this.AccommodationBooking.AccomodationSpaces.reduce((acc, pilot) => acc + pilot.priceSpace, 0);
  }

}
