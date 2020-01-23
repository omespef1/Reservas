import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  Refresher,
  ModalController
} from "ionic-angular";
import { invited, user } from "../../class/models/models";
import { InvitedProvider } from "../../providers/invited/invited";
import { sessions } from "../../class/sessions/sessions";
import { transaction } from "../../class/Models/models";
import { BookingNewInvitedPage } from "../booking-new-invited/booking-new-invited";

/**
 * Generated class for the BookingInvitedsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-booking-inviteds",
  templateUrl: "booking-inviteds.html"
})
export class BookingInvitedsPage {
  inviteds: invited[] = [];
  user: user = new user();
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private _service: InvitedProvider,
    private _sesion: sessions,
    private _modal: ModalController
  ) {}

  ionViewDidLoad() {
    this.GetInviteds();
  }

  async GetInviteds(refresher: Refresher = null) {
    this.user = <user>await this._sesion.GetLoggedin();
    console.log(user);
    this._service
      .GetInviteds(this._sesion.GetClientEmpCodi(), this.user.Sbe_codi)
      .then((resp: transaction) => {
        if (refresher != null) refresher.complete();

        if (resp!=undefined && resp.Retorno == 0) {
          this.inviteds = resp.ObjTransaction;
        }
      });
  }

  doRefresh(refresher: Refresher) {
    this.GetInviteds(refresher);
  }

  newInvited() {
    // let modal = this._modal.create({
    //   BookingNewInvitedPage
    // });
    // modal.present();
    this.navCtrl.push(BookingNewInvitedPage);
  }
}
