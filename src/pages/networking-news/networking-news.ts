import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams, AlertOptions } from "ionic-angular";
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
  news: aeosapp[] = [];
  filter: string = "M";
  options: any[] = [
    { text: "Más recientes", value: "M" },
    { text: "Más Antiguos", value: "A" },
    { text: "Orden alfabético", value: "O" },
  
  ];
  optionsSheet: AlertOptions = { cssClass: "alert-nogal" };
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
      console.log(resp.ObjTransaction);

      if(this.news!=null && this.news.length>0){
        for(let notice of this.news){
          this.GetPhoto(notice);
        }
      }
    }
    })
    // setTimeout(() => {
    //   this.getting = false;
    // }, 4000);
  }

  openNew(myNew:aeosapp) {
  this.navCtrl.push(NetworkingNewsViewerPage, { 'new':myNew })
  }

  GetPhoto(myNew:aeosapp){
    console.log('cargando foto');
    this._aeosapp.GetPhoto(myNew.emp_codi,myNew.osa_cont).then((resp:transaction)=>{
      if(resp!=null && resp.Retorno==0){
        console.log(resp.ObjTransaction);
         myNew.osa_bmpr = "data:image/jpeg;base64," + resp.ObjTransaction.osa_bmpr;
      }
    })
  }
}