export interface notifications {

    title:string;
    body:string;
    date:Date;
}

export interface messageNotification {

    title:string;   
    message:string;    
}

export class notificationIdHandler{

rte_cont:any;
rte_osid:string;
rte_esta:string;
emp_codi:number;
ter_codi:number;
aud_ufac:Date;
aud_usua:string;
aud_esta:string;
}