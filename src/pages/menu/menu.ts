import { Component, ViewChild, OnInit } from "@angular/core";
import { IonicPage, NavController, NavParams, Slides } from "ionic-angular";
import { BookingPage } from "../booking/booking";
import { HistoryPage } from "../history/history";
import { PqrPage } from "../pqr/pqr";
import { EventsPage } from "../events/events";
import { AgreementsPage } from "../agreements/agreements";
import { AccommodationListPage } from "../accommodation-list/accommodation-list";
import { pageApp, GnConex, user, transaction } from '../../class/models/models';
import { TabsPage } from "../tabs/tabs";
import { sessions } from "../../class/sessions/sessions";
import { SettingsPage } from "../settings/settings";
import { InstitutionalPage } from "../institutional/institutional";
import { AgreementsProvider } from "../../providers/agreements/agreements";
import {  agreement } from "../../class/models/models";
import { BookingInvitedsPage } from "../booking-inviteds/booking-inviteds";
// import { NetworkingMenuPage } from "../networking-menu/networking-menu";
import { EventOnesignalIdHandlerProvider } from "../../providers/event-onesignal-id-handler/event-onesignal-id-handler";
import { notificationIdHandler } from "../../class/models/notifications/notifications";
import { PartnerProvider } from '../../providers/partner/partner';
import { NetworkingMenuPage } from "../networking-menu/networking-menu";

/**
 * Generated class for the MenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-menu",
  templateUrl: "menu.html",
})
export class MenuPage implements OnInit {
  tab1Root = BookingPage;
  tab2Root = HistoryPage;
  tab3Root = PqrPage;
  tab4Root = EventsPage;
  tab5Root = AgreementsPage;
  tab6Root = AccommodationListPage;
  loadingBanner = false;
  logo: string;
  banners: agreement[] = [];
  pages: pageApp[] = [
    {
      name: "Reservas",
      urlIcon: "assets/imgs/notebook.svg",
      page: BookingPage,
    },
    {
      name: "Consumos",
      urlIcon: "assets/imgs/stopwatch.svg",
      page: HistoryPage,
    },
    {
      name: "Pqr",
      urlIcon: "assets/imgs/questionary.svg",
      page: PqrPage,
    },
    {
      name: "Eventos",
      urlIcon: "assets/imgs/calendar.svg",
      page: EventsPage,
    },
    {
      name: "Servicios",
      urlIcon: "assets/imgs/handshake.svg",
      page: AgreementsPage,
    },
    {
      name: "Alojamiento",
      urlIcon: "assets/imgs/hotel.svg",
      page: AccommodationListPage,
    },
    {
      name: "Institucional",
      urlIcon: "assets/imgs/nogal.png",
      page: InstitutionalPage,
    },
    {
      name: "Libro de invitados",
      urlIcon: "assets/imgs/guest-post.svg",
      page: BookingInvitedsPage,
    },   
    // {
    //   name: "Nogal Conecta",
    //   urlIcon: "assets/imgs/conecta1.svg",
    //   page: NetworkingMenuPage,
    // },
    {
      name: "Perfil socio",
      urlIcon: "assets/imgs/partner-profile.svg",
      page: SettingsPage,
    }    
  ];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private _sesion: sessions,
    private _agrrements: AgreementsProvider,
    private _one: EventOnesignalIdHandlerProvider,
    private _partner:PartnerProvider
  ) {}

  ngOnInit(): void {
    this.sendOneSignal();
    this.GetBanners();
   
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
  }
  ionViewDidLoad() {
    this.GetBenficiares();
  }

  GetBenficiares(){
   this._sesion.GetLoggedin().then((resp)=>{    
     if(resp){
       let user:user = resp;        
          this._partner.GetBeneficiarieslikeInviteds(this._sesion.GetClientEmpCodi(),user.Mac_nume).then((beneficiaries:transaction)=>{
              if(beneficiaries!=null){
                console.log(beneficiaries.ObjTransaction);
               this._sesion.SetBeneficiariesInviteds(beneficiaries.ObjTransaction);
              }

          })
     }
   })
  }

  async sendOneSignal() {
    let data: any = await this._sesion.getOneSignalIds();
    if(data!=undefined){
      let user: user = await this._sesion.GetLoggedin();
      let notification: notificationIdHandler = new notificationIdHandler();
      notification.emp_codi = this._sesion.GetClientEmpCodi();
      notification.rte_esta = "A";
      notification.rte_osid = data.userId;
      notification.ter_codi = user.Ter_Codi;
      this._one.PostNewNotificationId(notification).then((resp: transaction) => {
        if (resp.ObjTransaction) {
          console.log("notificacion guardada");
        }
      });
    }
  
  }
  openTab(page: number) {
    //Esta linea fija como raiz de las tabs networking, descomentar para activar networking
    // if (page == 8) this.navCtrl.setRoot(NetworkingMenuPage);
    // else
     this.navCtrl.setRoot(TabsPage, { tabSelected: page });
  }
  goProfile() {
    this.navCtrl.push(SettingsPage);
  }
  GetBanners() {
    this.loadingBanner = true;
    this._agrrements.GetBanners().then((resp: transaction) => {
      this.loadingBanner = false;
      if (resp != null && resp.Retorno == 0) {
        console.log(resp);
        this.banners = resp.ObjTransaction;
      }
    });
  }
}
