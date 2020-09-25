import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ModalController,
} from "ionic-angular";
import { disponibilityRequest, radio } from "../../class/models/models";
import * as moment from "moment";
//providers
import { BookingProvider } from "../../providers/booking/booking";
//Clases
import { sessions } from "../../class/sessions/sessions";
import { user, Ifactory } from "../../class/models/models";
import { general } from "../../class/general/general";
//pages
import { BookingPage } from "../../pages/booking/booking";
//pipes
import { DigitalDatePipe } from "../../pipes/digital-date/digital-date";
import { EventInvitedBookingPage } from "../event-invited-booking/event-invited-booking";

/**
 * Generated class for the ConfirmPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-confirm",
  templateUrl: "confirm.html",
})
export class ConfirmPage {
  startTime: string;
  endTime: string;
  today: Date = new Date();
  user: user;
  booking: Ifactory;
  transport:string;
  constructor(
    public navParams: NavParams,
    private _booking: BookingProvider,
    private _sesion: sessions,
    private _general: general,
    private _nav: NavController,
    private _modal: ModalController
  ) {
    this.booking = navParams.get("booking");

    this._sesion.GetLoggedin().then((user: user) => {
      this.user = user;
    });
  }

  ionViewDidLoad() {
    this.booking.inviteds=[];
    this.booking.transport="";
  }
  SetBooking() {
    if (this.booking.thirdPartie == null)
      this.booking.thirdPartie = {
        Ter_codi: 0,
      };

    let newBooking: any = {
      Emp_codi: this._sesion.GetClientEmpCodi(),
      Res_fini: this.booking.agend.age_Fini,
      Res_fina: this.booking.agend.age_Fina,
      Soc_cont: this.user.Soc_cont,
      Mac_nume: this.user.Mac_nume1,
      Sbe_cont: this.user.Sbe_cont,
      Esp_cont: this.booking.agend.esp_cont,
      Res_numd: 0,
      Ite_cont: 10207,
      Ter_codi: this.booking.thirdPartie.Ter_codi,
      Res_tdoc: 0,
      Res_dinv: 0,
      Res_ninv: "",
      Res_inac: "",
      Cla_cont: this.booking.class.Cla_cont,
      Esp_mdit: this.booking.product.esp_mdit,
      arb_sucu: 0,
      Ter_CodiN: this.user.Ter_Codi,
      cotizacionExpress: false,
      Productos: [
        {
          Pro_cont: this.booking.product.Pro_cont,
          Dpr_valo: this.booking.product.Pro_Valo,
          Dpr_dura: this.booking.product.Pro_dmin,
        },
      ],
      guests: this.booking.inviteds,
    
    };

    let inputs: radio[] = [
      { type: "radio", value: "Peaton", label: "Peatonal", checked: false },
      { type: "radio", value: "Vehículo", label: "Vehicular", checked: false },
      { type: "radio", value: "Moto", label: "Moto", checked: false },
      { type: "radio", value: "Bicileta", label: "Bicicleta", checked: false },
      { type: "text", value: "Otro", label: "Otro", checked: false },
    ];

    this._general.showCustomAlertInputs(
      "Modo de transporte",
      inputs,
      (transport: any) => {      
        console.log(transport[0]);
        newBooking.transport =  transport[0];
        this._booking.SetBooking(newBooking).then((resp: any) => {
          if (resp != null) {
            if (resp.InvoiceId == 0) {
              this._general.ShowMessageAlert(
                "Reserva no realizada",
                `${resp.TxtError}`
              );
              return;
            }
            this._general.ShowMessageAlert(
              "Reserva realizada!",
              `Se ha creado la reserva número ${resp.InvoiceId}, puede ver los detalles o cancelarla en la sección mis reservas.`
            );
            this._nav.setRoot(BookingPage);
          }
        });
      },
      "",
      "",
      "Especifíca el modelo de transporte en el cual te transporás al club"
    );
  }

  addInvited() {
    var modal = this._modal.create(EventInvitedBookingPage);
    modal.present();
    modal.onDidDismiss((data)=>{
        this.booking.inviteds.push(data);

    })
  }

  deleteInvi(doc){
    this.booking.inviteds.forEach( (item, index) => {
      if(item === doc) this.booking.inviteds.splice(index,1);
    });
  }
}
