import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { SopernwProvider } from '../../providers/sopernw/sopernw';
import { sessions } from '../../class/sessions/sessions';
import { sopernw, user, transaction, sodpern } from '../../class/models/models';
import { NetworkingMenuPage } from '../networking-menu/networking-menu';
import { NetworkingEditTextPage } from '../networking-edit-text/networking-edit-text';


/**
 * Generated class for the NetworkingProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-networking-profile',
  templateUrl: 'networking-profile.html',
})
export class NetworkingProfilePage {
  myProfileMode= true;
  myProfile: sopernw = {
    emp_codi: 102,
    per_cont: 1,
    soc_cont: 39,
    sbe_cont: 1,
    mac_nume: "3023",
    ite_prof: 0,
    ite_seco: 0,
    per_aexp: 0,
    per_admi: "soy ingenero de sistemas con mas de 20 años de experiencia en proyectos informaticos",
    per_foto: ["string"],
    per_tags: "string",
    per_esta: "A",
    cas_cont: 0,
    aud_ufac: new Date(),
    aud_usua: "string",
    aud_esta: "string",
    details: [
      {
        emp_codi: 0,
        per_cont: 0,
        dpe_proy: 0,
        dpe_npro: "Digitalware S.A",
        dpe_desc: "Empresa del sector de tecnología especializada en Software ERP, Software de Nómina y Gestión Humana y Software para IPS y Clínicas, con más de 25 años en el mercado, líder en diseño e implantación de soluciones empresariales en las áreas de RRHH, Finanzas, Logística, Manufactura, Seguridad, Petróleos, Energía, Cajas de Compensación, Gobierno, Educación y Salud.",
        dpe_fpro: ["string"],
        cas_cont: 0,
        aud_ufac: new Date(),
        aud_usua: "string",
        aud_esta: "string"
      },
      {
        emp_codi: 0,
        per_cont: 0,
        dpe_proy: 0,
        dpe_npro: "Facebook",
        dpe_desc: "compañía estadounidense que ofrece servicios de redes sociales y medios sociales en línea con sede en Menlo Park, California. Su sitio web fue lanzado el 4 de febrero de 2004 por Mark Zuckerberg, junto con otros estudiantes de la Universidad de Harvard y compañeros de habitación, Eduardo Saverin, Andrew McCollum, Dustin Moskovitz y Chris Hughes. Está disponible en español desde febrero de 2008.4​ Facebook es una plataforma que funciona sobre una infraestructura de computación basada principal y totalmente en sistemas GNU/Linux, usando el conjunto de tecnologías LAMP, entre otras.",
        dpe_fpro: ["string"],
        cas_cont: 0,
        aud_ufac: new Date(),
        aud_usua: "string",
        aud_esta: "string"
      }
    ]
  }
  loadingProfile = true;
  user: user;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private _sopernw: SopernwProvider,
     private _sessions: sessions,
     private _modal:ModalController) {

      this._sessions.GetLoggedin().then((user)=>{
        this.user = user;
      })
  }

  ionViewDidLoad() {
    console.log(this.navParams.get('myProfile'));
  this.myProfileMode = this.navParams.get('myProfile')==undefined?true:false;
    console.log('ionViewDidLoad NetworkingProfilePage');
    console.log(this.navParams.get('myProfile'));
  }

  GetSoPernw() {
    this._sopernw
      .GetSoPernw(
        this.user.Emp_codi,
        this.user.Sbe_cont,
        this.user.Soc_cont,
        this.user.Mac_nume
      )
      .then((resp: transaction) => {

        this.loadingProfile = false;
      });
  }

  goHome(){
    this.navCtrl.setRoot(NetworkingMenuPage);
  }
  goEditAbout(){
  
  this.showModalEdit('Acerca de mí',this.myProfile.per_admi, ((data:any)=>{
    

    if(data){
       this.myProfile.per_admi = data.editText;
    }
  }))
   
  }


  

  goEditProyect(proyect:sodpern){
    
    this.showModalEdit(proyect.dpe_npro,proyect.dpe_desc, ((data:any)=>{
    
      if(data){
        proyect.dpe_desc = data.editText;
      }
    }
    ))
     
    }
  
  

  showModalEdit(title:string,editText:string,callback:(data:any)=>void){
    let params:any = {  'title':title, 'editText': editText };
  let modal =  this._modal.create(
    NetworkingEditTextPage,
     params
    );
    modal.present();
    modal.onDidDismiss(callback);
  }

}
