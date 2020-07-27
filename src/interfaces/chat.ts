export interface message {
 
 content:string;
 date:number;
 read:boolean;
 uid:string;
}

export interface chatRoom {
    displayNameUser:string;
    profession:string;
    lastMessage:string;
    read:boolean
    users:string[];
    
}




