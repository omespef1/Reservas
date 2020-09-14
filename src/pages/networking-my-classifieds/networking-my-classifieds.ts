import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  AlertOptions,
  ModalController,
} from "ionic-angular";
import { soclanw } from "../../class/models/soclanw/soclanw";
import { user, transaction } from "../../class/models/models";
import { SoclanwProvider } from "../../providers/soclanw/soclanw";
import { sessions } from "../../class/sessions/sessions";
import { NetworkingClassifiedsNewPage } from "../networking-classifieds-new/networking-classifieds-new";
import { general } from '../../class/general/general';
import { NetworkingClassifiedViewerPage } from "../networking-classified-viewer/networking-classified-viewer";

/**
 * Generated class for the NetworkingMyClassifiedsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-networking-my-classifieds",
  templateUrl: "networking-my-classifieds.html",
})
export class NetworkingMyClassifiedsPage {
  getting = false;
  user: user;
  classifieds: soclanw[]=[]
  classifiedsAll: soclanw[]=[];
  filter: string = "M";
  today:Date;
  options: any[] = [
    { text: "Más recientes", value: "M" },
    { text: "Más Antiguos", value: "A" },
  ];
  optionsSheet: AlertOptions = { cssClass: "alert-nogal" };
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private _modal: ModalController,
    private _soclanw: SoclanwProvider,
    private _sessions: sessions,
    private _general:general
  ) {

  }


  ionViewDidLoad() {  
    this._sessions.GetLoggedin().then((resp: user) => {
      this.user = resp;
      this.GetSoClanws();
    });
  }

  GetSoClanws() {
    this.getting = true;
    this._soclanw
      .GetSoclanwClassifieds(
        this._sessions.GetClientEmpCodi(),
        this.user.Soc_cont,
        this.user.Sbe_cont,
        this.user.Mac_nume1
      )
      .then((resp: transaction) => {
        this.getting = false;
        if (resp != null && resp.Retorno == 0) {
          this.classifieds = resp.ObjTransaction;        
          if (this.classifieds != null && this.classifieds.length > 0) {
           this.pushClassified(0,9)
            this.setFilter(this.filter);
          }
         
        }
      });
  }

  doInfinite(infiniteScroll) {
    console.log('Begin async operation'); 
     setTimeout(() => {
      this.pushClassified(this.classifiedsAll.length,this.classifiedsAll.length+10)
      infiniteScroll.complete();
     }, 500);
    
     
     
    

  }
  goClassifiedViewer(classified:soclanw){
    this.navCtrl.push(NetworkingClassifiedViewerPage, { 'classified': classified})
  }
  pushClassified(init:number,end:number){
    for(let i = init; i<=end;i++){
     if(i<=this.classifieds.length-1){
      this.classifiedsAll.push(this.classifieds[i]);
      this.GetPhoto(this.classifiedsAll[i]);
     }
   
    }
  }

  GetPhoto(classified: soclanw) {
    console.log("obteniendo imagenes..");
    this._soclanw
      .GetPhoto(classified.emp_codi, classified.cla_cont)
      .then((resp: transaction) => {
        if(resp!=null && resp.Retorno==0){  
          if(resp.ObjTransaction.cla_foto!='' && resp.ObjTransaction.cla_foto!=null)      
          classified.cla_foto = "data:image/jpeg;base64," + resp.ObjTransaction.cla_foto;
          else
          classified.cla_foto ="";
        }
      });
  }
  updateClassified(classified:soclanw){

    this._general.showCustomAlertInputs('Eliminar este clasificado?',[],()=>{ this.delete(classified)},'alert-nogal','','Esta acción no puede deshacerse')

  }
  delete(classified:soclanw){
    this._soclanw.updateSoClanwDelete(classified.emp_codi,classified.cla_cont).then((resp:transaction)=>{
      if(resp!=undefined && resp.Retorno==0){
        this._general.showCustomAlert('Perfecto!','Clasificado eliminado!',()=>{},'alert-nogal');
        this.ionViewDidLoad();
      }
    })
  }
  setFilter($event) {
    //let orderClassifieds = this.classifieds;
    console.log($event);
    console.log(this.classifieds);
    switch ($event) {
      case "M":
        console.log("desc");
        this.classifiedsAll.sort((a, b) =>
          a.cla_fech < b.cla_fech ? 1 : b.cla_fech < a.cla_fech ? -1 : 0
        );
        break;
      case "A":
        console.log("asc");
        this.classifiedsAll.sort((a, b) =>
          a.cla_fech > b.cla_fech ? 1 : b.cla_fech > a.cla_fech ? -1 : 0
        );
        // this.classifieds.sort((a, b) =>
        // a.cla_fech < b.cla_fech ? 1 :  a.cla_fech < b.cla_fech ?-1:0
        // );

        break;
      default:
    }
  }

  editClassified(classified:soclanw){
    this.navCtrl.push(NetworkingClassifiedsNewPage,{ 'editClassified':classified})
  }

  getItems(q: string) {
    //Reseteo los items a su estado original
    this.classifiedsAll = this.classifieds.slice(0,this.classifiedsAll.length-1);
    //Si el valor es vacío ni filtra ndada
    if (!q || q.trim() === '') {
    return;
    }
    //Realiza el filtrado
    this.classifiedsAll = this.classifiedsAll.filter((v) =>  v.cla_titu.toLowerCase().indexOf(q.toLowerCase()) > -1);
    }
}
