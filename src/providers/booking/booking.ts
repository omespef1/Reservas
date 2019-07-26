import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
//providers
import { ComunicationsProvider } from '../../providers/comunications/comunications';
import { ClassSpacesProvider } from '../class-spaces/class-spaces';
//clases
import {disponibilityRequest,disponibilityRequestEvent, bookingInfo} from '../../class/models/models';
import {general} from  '../../class/general/general';
import {sessions} from  '../../class/sessions/sessions';





/*
  Generated class for the BookingProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class BookingProvider {

  constructor(private _comunications: ComunicationsProvider, private _classSpaces: ClassSpacesProvider,private _general:general,private _sesion:sessions,private session:sessions) {
    
  }
  GetBooking(partner: any) {
  
    return this._comunications.Get(`reserva?soc_cont=${partner.Soc_cont}&sbe_cont=${partner.Sbe_cont}&sbe_codi=${partner.Sbe_codi}`,true,'Cargando información de reservas realizadas...');
  }
  GetBookinQuotation(partner: any) {
  
    return this._comunications.Get(`reserva?soc_cont=${partner.Soc_cont}&sbe_cont=${partner.Sbe_cont}&sbe_codi=${partner.Sbe_codi}&cla_cont=${this.session.getAeParam().cla_ceve}`,true,'Cargando información de reservas realizadas...');
  }
  GetGnItems() {
    return this._comunications.Get(`GnItems?tit_cont=349`);
  }
  cancelBooking(booking: any) {
    return this._comunications.Post(booking, `reserva/cancelar`,'Cancelando reserva...');
  }
  GetDisponibility(booking:disponibilityRequest){
    return this._comunications.Get(`Agenda?Cla_cont=${booking.Cla_cont}&pro_cont=${booking.pro_cont}&year=${booking.year}&month=${booking.month+1}&esp_mdit=${booking.esp_mdit}&ter_codi=${booking.ter_codi}&Op_Disp=${booking.Op_Disp}`,true,'Verificando disponibilidad del mes, esto podría tardar unos segundos...')
  }
  SetBooking(booking:any){
    console.log('Casi genera reserva...');
    return this._comunications.Post(booking,'reserva','Reservando...Esto podría tardar unos segundos...');
  }
  GetDisponibilityEvents(booking:disponibilityRequestEvent){
    return this._comunications.Get(`Agenda/GetCotiz?dho_hori=${booking.dho_hori}&dho_horf=${booking.dho_horf}&dho_mesp=${booking.dho_mesp+1}&dho_anop=${booking.dho_anop}&esp_capa=${booking.esp_capa}`,true,'Verificando disponibilidad del mes, esto podría tardar unos segundos...',true)
  }
  GetProductBooking(esp_cont:number,res_fini:string,res_fina:string){
    return this._comunications.Get(`Producto/GetProductosCotizacion?esp_cont=${esp_cont}&res_fini=${res_fini}&res_fina=${res_fina}`,true,'Cargando...',true);
  }
  GetGnToper(){
    return this._comunications.Get(`GnToper?emp_codi=${this._sesion.GetClientEmpCodi()}`)
  }

  cancelBookings(booking: bookingInfo) {



    let promise:Promise<any> = new Promise((resolve,reject)=>{

    //Se optiene la clase de espacio para verificar si ya se cumplió el tiempo de cancelación
    this._classSpaces.GetClassSpace(booking).then((resp: any) => {
      let fechaInicio = new Date(resp.FechaInicio);
      let fechaInicioPosible = this._general.addMinutes(resp.Cla_Tica);
      if (fechaInicioPosible > fechaInicio) {
        this._general.showToastMessage(`El plazo para cancelar la reserva  (${resp.Cla_Tica}) minuto(s) ha vencido.`, 'bottom')
        return;
      }
      //Se obtienen los items para llenar los motivos de rechazo
      this.GetGnItems().then((resp: any) => {
        if (resp != null) {
          let items = resp.ObjTransaction;
          this._general.showConfirmMessage('Está seguro de que desea cancelar esta reserva?', 'Seleccione el motivo', items).then(resp => {
            if (resp != null && resp != 0) {
              let cancel = { justification: resp, id: booking.Res_cont, emp_codi: this._sesion.GetClientEmpCodi() }
              //Se cancela la reserva según el motivo de selección del usuario
           return   this.cancelBooking(cancel).then((resp: any) => {
                if (resp != null) {
                  this._general.showToastMessage('La reserva se ha cancelado!', 'bottom'); 
                  resolve();                
                }            
              })
            }
          }).catch(err => {
            reject();
          })
        }
      })

    })
    })
    return promise;

  }

}
