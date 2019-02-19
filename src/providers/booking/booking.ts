import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
//providers
import { ComunicationsProvider } from '../../providers/comunications/comunications';
import { ClassSpacesProvider } from '../class-spaces/class-spaces';
//clases
import {disponibilityRequest} from '../../class/models/models';
import {disponibilityRequestEvent} from '../../class/models/models';



/*
  Generated class for the BookingProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class BookingProvider {

  constructor(private _comunications: ComunicationsProvider, private _classSpaces: ClassSpacesProvider) {
    console.log('Hello BookingProvider Provider');
  }
  GetBooking(partner: any) {
    return this._comunications.Get(`reserva?soc_cont=${partner.Soc_cont}&sbe_cont=${partner.Sbe_cont}`,true,'Cargando información de reservas realizadas...');
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
    return this._comunications.Post(booking,'reserva','Reservando...Esto podría tardar unos segundos...');
  }
  GetDisponibilityEvents(booking:disponibilityRequestEvent){
    return this._comunications.Get(`Agenda/GetCotiz?dho_hori=${booking.dho_hori}&dho_horf=${booking.dho_horf}&dho_mesp=${booking.dho_mesp}&dho_anop=${booking.dhop_anop}&esp_capa=${booking.esp_capa}`,true,'Verificando disponibilidad del mes, esto podría tardar unos segundos...',true)
  }

}
