

export class TOSoRsoci {
  public Emp_codi: number;
  public Mac_nume: string;
  public Sbe_ncar: string;
  public Sbe_mail: string;
  public Sbe_ncel: string;
  public Soc_cont: string;
  public Sbe_cont: string;
  public Soc_cing: string;
  public Sbe_pass: string = "";
  public Soc_cfec: string;
  constructor(
  ) {

  }
}
export interface item {
  Ite_nomb: string;
  Ite_codi: string;
  Tit_cont: number;
  Ite_cont: number;
}

export interface itemSource {
  items: item[];
  icon: string;
  title: string;
}
export class pqr {
  public emp_codi: number;
  public inp_feve: Date;
  public inp_esta: string;
  public arb_csuc: string;
  public inp_tcli: string;
  public inp_ncar: string;
  public ite_frec: number;
  public ite_tpqr: number;
  public arb_ccec: string;
  public ite_spre: number;
  public ite_ancu: number;
  public inp_mpqr: string;
  public sbe_ncar: string;
  public soc_cont: number;
  public sbe_cont: number;
  public mac_nume: string;
  constructor() {

  }
}

export class user {
  Soc_nomb: string;
  Soc_apel: string;
  Soc_tele: string;
  Mac_nume: string;
  Soc_pass: string;
  Soc_cont: number;
  Sbe_cont: number;
  Sbe_codi: string;
  Emp_codi: number;
  Soc_foto: string;
  be_fexp: Date;
  Sbe_ncar: string;
  Mac_nume1: string;
  Soc_ncar: string;
  Sbe_mail: string;
  Sbe_ncel: string;
  Sbe_dire: string;
  Emp_tele: string;
  Emp_nite: string;
  soc_ncar: string;
  constructor(){

  }
}
export interface transaction {
  Retorno: number;
  TxtError: string;
  ObjTransaction: any;
}

export interface disponibility {
  title: string;
  startTime: Date;
  endTime: Date;
  allDay: boolean;
}
export interface booking {
  Emp_codi: number;
  Res_fini: Date;
  Res_fina: Date;
  Soc_cont: number;
  Mac_nume: string;
  Sbe_cont: number;
  Esp_cont: number;
  Res_numd: number;
  Ite_cont: number;
  Ter_codi: number;
  Res_tdoc: number;
  Res_dinv: number;
  Res_ninv: string;
  Res_inac: string;
  Productos: any[];
  Cla_cont: number;
  Esp_mdit: string;
  arb_sucu: number;
  cotizacionExpress: boolean;
}
export class booking {  
  Emp_codi: number;
  Res_fini: Date;
  Res_fina: Date;
  Soc_cont: number;
  Mac_nume: string;
  Sbe_cont: number;
  Sbe_codi: string;
  Esp_cont: number;
  Res_numd: number;
  Ite_cont: number;
  Ter_codi: number;
  Res_tdoc: number;
  Res_dinv: number;
  Res_ninv: string;
  Res_inac: string;
  Productos: any[];
  Cla_cont: number;
  Esp_mdit: string;
  rooms: room[] = [];
  AccomodationSpaces:space[]=[];
 
}
export class room {
  type:string;
  guests:number;
}

export class ToUpdatetMultiBooking {
   Ids:any[]=[];
   emp_codi:number;
}

export class space {
  Esp_cont:number;
  Esp_codi:number;
  Esp_nomb:string;
  Esp_desc:string;
  esp_capa:number;
  arb_sucu:Number;
  Esp_imag:any;
  room:room;
  //Para cálculos de la aplicación sobre lo que vale el espacio en total
  priceSpace:number;
  //Desglose de los productos para tarifa plena y tarifa adicional según fin de semana y entre semana
  detailLiquidation:any[];
  //Liquidación que calcula seven sobre la reserva del espacio
  liquidation:liquidation;
  //Código interno de la reserva que se genera para el espacio
  res_cont:number;
  //Código externo para la reserva que se genera para el espacio
  res_nume:number;
}


export class disponibilityRequest {
  public Cla_cont: number = 0;
  public pro_cont: number = 0;
  public year: number = 0;
  public month: number = 0;
  public day: number = 0;
  public esp_mdit: string = "";
  public ter_codi: number = 0;
  public Op_Disp: string = "";
  public Cla_nomb: string = "";
  public Pro_nomb: string = "";
  public startTime: string;
  public endTime: string;
  constructor() {

  }


}

export class disponibilityRequestEvent {
  public dho_hori: string;
  public dho_horf: string;
  public esp_capa: number;
  public dho_mesp: number;
  public dho_anop: number;
  public emp_codi: number;

}

export class disponibilityResponseEvent {
  public esp_cont: number;
  public esp_nomb: string;
  public dho_hori: string;
  public dho_horf: string;
  public esp_codi: string;
  public cla_cont: number;
  public cla_codi: string;
  public arb_sucu: number;
  public product: any;
  public hours:number;
  public minutes:number;
}


export class factory {
  public class: any;
  public agend: any;
  public space: any;
  public product: any;
  public user: any;
  public thirdPartie: any = { Ter_codi: 0 };
  public optionDisp: any = { OpDisp: "" };
  constructor() {

  }
}
export interface Ifactory {
  class: any;
  agend: any;
  space: any;
  product: any;
  user: any;
  thirdPartie: any;
  optionDisp: any;

}
export interface DisponibilityTime {
  FechaInicio: Date;
  FechaFin: Date;
  esp_cont: number;
  Estado: string;
}
export interface GnConex {
  id:number;
  CNX_IPSR: string;
  CNX_BACK: string;
  CNX_LOGO: string;
  CNX_LINK: string;
  CNX_CPRI: string;
  CNX_CSEG: string;
  CNX_CTER: string;
  CNX_FCLA: string;
}
export interface GnEmpre {
  Emp_Codi: number;
  Emp_Nomb: string;
}
export interface GnAppDw {
  App_Cont: number;
  App_Nomb: string;
  App_Vers: string;
}
export interface GnDigfl {
  dig_codi: string;
  dig_valo: string;
  dig_nomb: string;
}
export interface bookingInfo {
  Emp_Codi: number,
  Cla_nomb: string;
  Cla_foto: string;
  Esp_imag: string;
  Esp_nomb: string;
  esp_codi:string;
  Pro_nomb: string;
  pro_cont:number;
  FechaInicio: Date;
  FechaFin: Date;
  Res_cont: number;
  Res_nume: number;
  Res_esta: string;
  Res_vige: string;
  Esp_mdit: string;
  Cla_cont: number;
  Cla_tica: string;
  Ter_codi: number;
  Ter_foto: string;
  res_valo: number;
  Ter_noco: string;
  cla_ppag: string;
  tip_codi:number;
  payment: paymentOut;
  esp_cont: number;
  products:product[];
  ecmcomp: ecmcomp[];
  checked:boolean;
  liquidacion:liquidation; 
  esp_capa:number;
}

export interface payment {
  valor: number;
  sbe_codi: string;
  sbe_ncar: string;
  emp_codi: number;
  soc_mail: string;
  productos: number[];
  dpa_tabla:string;

}
export interface paymentOut {
  pap_tkid:number;
  pap_esta: string;
  pap_proc: string;
  sbe_codi: string;
  pad_vpag: number;
 
}
export interface bankTransactDone {
  EntityCode: string,
  TicketId: string,
  TrazabilityCode: string,
  TranState: string,
  ReturnCode: string,
  TransValue: number,
  TransVatValue: number,
  CurrencyRate: number,
  BankProcessDate: Date,
  FICode: string,
  BankName: string,
  PaymentSystem: string,
  TransCycle: string,
  Invoice: string,
  ReferenceArray: string[],
  AuthReferenceArray: string[],
  SrvCode :string
} 
export interface agreement {
  Osa_Bmpr:string;
  Osa_Link: string;
  Osa_Nomb: string;
  Osa_Lian: string;
  Osa_Liap: string;
 
}

export class ecmcomp {
  emp_codi:number;
  mco_nomb: string;
  mco_codi: string;
  quantity: number;
  checked:boolean=false;
  open:boolean=false;
 detalles :ecdemco [];
}

export interface ecdemco {
  pro_cont:number,
  pro_nomb: string,
  pro_codi: string,
  dem_cant: number,
  dsp_codi :string,
  dli_valo:number,
  tip_codi:number,
}

export interface product {
  pro_cont:number,
  des_visu:string,
  pro_nomb:string,
  pro_dmin:number,
  dli_valo:number,
  dsp_codi:string,
  tip_codi:number,
  checked:boolean

} 
export interface gntoper {
  top_codi:number,
  top_nomb:string

}
export class eccotiz {
  emp_codi:number;
  top_codi	:number 		;	
   top_nomb:string;
   esp_codi:string;
   cot_nume:number;
   cot_vato:number;
   cot_cont:number;
   cot_desc	:string 	;	
   cot_fing 	:Date	;	
   cot_fsal 	:Date	;	
   soc_cont	:number 		;
   sbe_codi:string;
   mac_nume:string;
   sbe_cont:number;
   cla_ppag:string; 
   reservas: bookingInfo[];
   payment:any[];
   espacios:EcDespa[];

}


export class EcDespa {
  des_capa:number;
  des_cont:number;
  Esp_nomb:string;
  Res_nume:string;
  Res_cont:number;
  hijos: EcDphij[];
};
export class EcDphij {
  pro_codi:string;
  pro_nomb:string;
  dph_cant:number;

};
export class liquidation {
  subTotal:number;
  totalImpuestos:number;
  valorTotal:number;
};

export interface gn_papse {
  pap_tkid:number,
  pap_esta:string,
  sbe_codi:number,
  pad_vpag:number,
  aud_ufac:Date,
  detail: gn_dpaps[],
}
export interface gn_dpaps{
  pap_tkid:number,
  dpa_tcnt:number,
  dpa_tbla:string,
  fac_cont:number,
  res_nume:number,
  cot_nume:number,
  fac_nume:number

}

export class ae_param {

  cla_ceve:number;
  cla_cont:number;

}

export interface pageApp {

  urlIcon:string;
  name:string;
  page:any
}