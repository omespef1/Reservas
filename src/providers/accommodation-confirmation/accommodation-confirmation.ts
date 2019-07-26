import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { booking, ToUpdatetMultiBooking } from '../../class/models/models';
import { ComunicationsProvider } from '../comunications/comunications';
import { sessions } from '../../class/sessions/sessions';


/*
  Generated class for the AccommodationConfirmationProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AccommodationConfirmationProvider {

  constructor(public http: HttpClient,private _comu:ComunicationsProvider,private _sesion:sessions) {
   
  }


  GetValuesSpaces(booking:booking){
   return this._comu.Post(booking,'Pagos/GetValoresRseserva','Verificando tarifas.Espere...');
  }
  updateBookingStates(objUdp:ToUpdatetMultiBooking){
     objUdp.emp_codi = this._sesion.GetClientEmpCodi();
    return this._comu.Post(objUdp,'reserva/actualizar');
  }
}
