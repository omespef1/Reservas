import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertOptions, Refresher } from 'ionic-angular';
import { NetworkingMenuPage } from '../networking-menu/networking-menu';
import { NetworkingClassifiedsTermsPage } from '../networking-classifieds-terms/networking-classifieds-terms';
import { NetworkingClassifiedsNewPage } from '../networking-classifieds-new/networking-classifieds-new';
import { SoclanwProvider } from '../../providers/soclanw/soclanw';
import { user, transaction } from '../../class/models/models';
import { sessions } from '../../class/sessions/sessions';
import { soclanw } from '../../class/models/soclanw/soclanw';
import { NetworkingImageViewerPage } from '../networking-image-viewer/networking-image-viewer';
import { NetworkingMyClassifiedsPage } from '../networking-my-classifieds/networking-my-classifieds';
import { NetworkingClassifiedViewerPage } from '../networking-classified-viewer/networking-classified-viewer';


/**
 * Generated class for the NetworkingClassifiedsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-networking-classifieds',
  templateUrl: 'networking-classifieds.html',
})
export class NetworkingClassifiedsPage implements OnInit {
  getting=false;
  user:user;
  classifieds:soclanw[]=[];
  classifiedsAll:soclanw[]=[];
  filter: string = "M";
  options: any[] = [
    { text: "Más recientes", value: "M" },
    { text: "Más Antiguos", value: "A" },
  
  ];
  optionsSheet: AlertOptions = { cssClass: "alert-nogal" };
  constructor(public navCtrl: NavController, public navParams: NavParams,private _modal:ModalController,
    private _soclanw:SoclanwProvider,private _sessions:sessions) {
    

     


  }

  loadData(refresh?:Refresher){
    this.classifieds=[];
    this._sessions.GetLoggedin().then((resp:user)=>{
      this.user = resp;
      this.GetSoClanws();
     if(refresh) refresh.complete();
    })
  }
  ngOnInit(){
   this.loadData();
  }
  ionViewDidLoad() {
    
   
    console.log('ionViewDidLoad NetworkingClassifiedsPage');
  }

  doInfinite(infiniteScroll) {
    console.log('Begin async operation'); 
     setTimeout(() => {
      this.pushClassified(this.classifieds.length,this.classifieds.length+10)
      infiniteScroll.complete();
     }, 500);
    
     
     
    

  }

  pushClassified(init:number,end:number){
    for(let i = init; i<=end;i++){
     if(i<=this.classifiedsAll.length-1){
      this.classifieds.push(this.classifiedsAll[i]);
      this.GetPhoto(this.classifieds[i]);
     }
   
    }
  }

  goHome(){
    this.navCtrl.setRoot(NetworkingMenuPage);
  }
  
  goTerms(){
    this.navCtrl.setRoot(NetworkingClassifiedsTermsPage)
  }

  goNewClassified(){
    
   let modal= this._modal.create(NetworkingClassifiedsNewPage);
   modal.present();
    
  }

  GetSoClanws(){
   this.getting=true;
   this._soclanw.GetSoClanw(this._sessions.GetClientEmpCodi()).then((resp:transaction)=>{
    this.getting=false;
     if(resp!=null && resp.Retorno==0){
        
      // this.classifieds= resp.ObjTransaction;
        this.classifiedsAll = resp.ObjTransaction;
      this.pushClassified(0,10);

     }
   })
  }

  itsMine(classified:soclanw){
    if(classified.emp_codi == this._sessions.GetClientEmpCodi()
    && classified.sbe_cont == this.user.Sbe_cont
    && classified.soc_cont == this.user.Soc_cont 
    && classified.mac_nume == this.user.Mac_nume1)
    return true;
  }




  GetPhoto(classified:soclanw){
    console.log('obteniendo imagenes..');
    this._soclanw.GetPhoto(classified.emp_codi,classified.cla_cont).then((resp:transaction)=>{
      if(resp!=null && resp.Retorno==0){  
        if(resp.ObjTransaction.cla_foto!='' && resp.ObjTransaction.cla_foto!=null)      
        classified.cla_foto = "data:image/jpeg;base64," + resp.ObjTransaction.cla_foto;
        else
        classified.cla_foto ="";
      }
    })
  }

  setFilter($event){
    //let orderClassifieds = this.classifieds;
    console.log($event);
console.log(this.classifieds);
    switch ($event) {
      case "M":
        console.log("desc");
   this.classifieds.sort((a, b) => (a.cla_fech < b.cla_fech) ? 1 : ((b.cla_fech < a.cla_fech) ? -1 : 0))
       break;
      case "A":
        console.log("asc");
        this.classifieds.sort((a, b) => (a.cla_fech > b.cla_fech) ? 1 : ((b.cla_fech > a.cla_fech) ? -1 : 0))
        // this.classifieds.sort((a, b) =>
        // a.cla_fech < b.cla_fech ? 1 :  a.cla_fech < b.cla_fech ?-1:0
        // );  
     
        break;
      default:
       
    }
  }

  getItems(q: string) {
    //Reseteo los items a su estado original
    this.classifieds = this.classifiedsAll;
    //Si el valor es vacío ni filtra ndada
    if (!q || q.trim() === '') {
    return;
    }
    //Realiza el filtrado
    this.classifieds = this.classifieds.filter((v) =>  v.cla_titu.toLowerCase().indexOf(q.toLowerCase()) > -1);
    }

  goViewer(data){
  this.navCtrl.push(NetworkingImageViewerPage, {'image': data})
  }

  goMyClassifieds(){
    this.navCtrl.push(NetworkingMyClassifiedsPage);
  }

  doRefresh(refresher: Refresher) 
  {
    this.loadData(refresher);
  }

  goClassifiedViewer(classified:soclanw){
    this.navCtrl.push(NetworkingClassifiedViewerPage, { 'classified': classified})
  }
  
}
