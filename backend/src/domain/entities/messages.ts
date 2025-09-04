import { Iuser } from './User';
import { Idoctor } from './Doctor';

export interface Message {
  _id?:string;
  senderId: string | Iuser | Idoctor;
  recieverId: string | Idoctor | Iuser;
  message?: string;
  image?:string;
  messageType:'text'|'image'
  read?: boolean; 
 
}
