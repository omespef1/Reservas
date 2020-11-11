import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams, AlertOptions } from "ionic-angular";
import { NetworkingMenuPage } from "../networking-menu/networking-menu";
import { AeosappProvider } from "../../providers/aeosapp/aeosapp";
import { transaction, aeosapp, user } from "../../class/models/models";
import { sessions } from "../../class/sessions/sessions";
import { THIS_EXPR } from "@angular/compiler/src/output/output_ast";
import { NetworkingNewsViewerPage } from "../networking-news-viewer/networking-news-viewer";
import { DomSanitizer } from "@angular/platform-browser";

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
    private _sessions: sessions,
    private _sanitizer: DomSanitizer
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
        this.setFilter(this.filter);
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

  setFilter($event){
    //let orderClassifieds = this.classifieds;
    console.log($event);
console.log(this.news);
    switch ($event) {
      case "M":
        console.log("desc");
   this.news.sort((a, b) => (a.osa_fini < b.osa_fini) ? 1 : ((b.osa_fini < a.osa_fini) ? -1 : 0))
       break;
      case "A":
        console.log("asc");
        this.news.sort((a, b) => (a.osa_fini > b.osa_fini) ? 1 : ((b.osa_fini > a.osa_fini) ? -1 : 0))
       
        break;
        case "O":
          console.log("asc");
          this.news.sort((a, b) => (a.osa_nomb > b.osa_nomb) ? 1 : ((b.osa_nomb > a.osa_nomb) ? -1 : 0))
         
          break;
      default:
       
    }
  }

  getVideoIframe(url) {
    console.log(url);
    var video, results;
 
    if (url === null) {
        return '';
    }
    results = url.match('[\\?&]v=([^&#]*)');
    video   = (results === null) ? url : results[1];
 
    return this._sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + video);   
}
}
