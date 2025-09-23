import { IUser } from './User';
import { IDoctor } from './Doctor';

export interface Message {
  _id?:string;
  senderId: string | IUser | IDoctor;
  recieverId: string | IDoctor | IUser;
  message?: string;
  image?:string;
  messageType:'text'|'image'
  read?: boolean; 
 
}
