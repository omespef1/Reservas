export class TOSoRsoci {
  public Emp_codi: number;
  public Mac_nume: string;
  public Sbe_ncar: string;
  public Sbe_mail: string;
  public Sbe_ncel: string;
  public Soc_cont: string;
  public Sbe_cont: string;
  public Soc_cing: string;
  public Sbe_pass: string="";
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

export interface user {
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
}
export interface transaction {
  Retorno: number;
  TxtError: string;
  ObjTransaction: any;
}

export interface disponibility {
  title: string,
  startTime: Date;
  endTime: Date,
  allDay: boolean,
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
}
export class disponibilityRequest {
public  Cla_cont:number=0;
public  pro_cont:number=0;
public  year:number=0;
public  month :number=0;
public  day:number=0;
public  esp_mdit:string="";
public  ter_codi:number=0;
public  Op_Disp:string="";
public Cla_nomb:string="";
public Pro_nomb:string="";
public startTime:string;
public endTime:string;
constructor(){

}


}

export class factory {
 public  class:any;
 public agend:any;
 public space:any;
 public product:any;
 public user:any;
 public thirdPartie:any= {Ter_codi:0};
 public optionDisp:any = { OpDisp: ""}
 constructor(){

 }
}
export interface Ifactory {
class:any;
agend:any;
space:any;
product:any;
user:any;
thirdPartie:any;
optionDisp:any;

}
