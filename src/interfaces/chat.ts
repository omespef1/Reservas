export interface message {
 
 content:string;
 date?:number;
 read:boolean;
 uid?:string;
}

export interface chatRoom {
    displayNameUser:string;
    profession:string;
    lastMessage:message;
    read:boolean
    users:string[];
    uidPartner:string;
    partnerPhoto:string;
    loaded:boolean;
    oneSignalId:string;
    
}




