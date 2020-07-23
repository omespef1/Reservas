export interface message {
 
 content:string;
 date:number;
 read:boolean;
 uid:string;
}

export interface chatRoom {
    id:number;
    companyId:number;
    date:number;
    participants:number[];    
}




