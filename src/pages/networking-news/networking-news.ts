import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { NetworkingMenuPage } from "../networking-menu/networking-menu";
import { AeosappProvider } from "../../providers/aeosapp/aeosapp";
import { transaction, aeosapp, user } from "../../class/models/models";
import { sessions } from "../../class/sessions/sessions";
import { THIS_EXPR } from "@angular/compiler/src/output/output_ast";
import { NetworkingNewsViewerPage } from "../networking-news-viewer/networking-news-viewer";

/**
 * Generated class for the NetworkingNewsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-networking-news",
  templateUrl: "networking-news.html",
})
export class NetworkingNewsPage {
  getting = false;
  news: aeosapp[] = [  {
    
    Osa_Cont: 102,
    Osa_Nomb: "Duque amplía emergencia económica para afrontar covid-19",
    Osa_Link: ".",
    Osa_Liap: ".",
    Osa_Lian: ".",
    Osa_Fini: "07/05/2020",
    Osa_Fina: "0001-01-01T00:00:00",
    Osa_Bmpr: null,
    osa_msge:"El presidente Iván Duque, en su programa Prevención y Acción, anunció este miércoles una ampliación de la emergencia económica en el país para afrontar la crisis de coronavirus ocasionada por la pandemia.El presidente Iván Duque, en su programa Prevención y Acción, anunció este miércoles una ampliación de la emergencia económica en el país para afrontar la crisis de coronavirus ocasionada por la pandemia ",
  }  ]
   

  user: user = new user();
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private _aeosapp: AeosappProvider,
    private _sessions: sessions
  ) {
   
  }

  ionViewDidLoad() {
    this._sessions.GetLoggedin().then((resp: user) => {
      this.user = resp;
      this.GetNews();
    });
   
  }
  goHome() {
    this.navCtrl.setRoot(NetworkingMenuPage);
  }

  GetNews() {
    this.getting = true;
    this._aeosapp.GetNews(this._sessions.GetClientEmpCodi()).then((resp:transaction)=>{
      this.getting=false;
    if(resp!=null && resp.Retorno==0){
      this.news = resp.ObjTransaction;
    }
    })
    // setTimeout(() => {
    //   this.getting = false;
    // }, 4000);
  }

  openNew(myNew:aeosapp) {
  this.navCtrl.push(NetworkingNewsViewerPage, { 'new':myNew })


  }
}
