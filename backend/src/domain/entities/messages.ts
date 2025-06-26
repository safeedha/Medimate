import { Iuser } from './user';
import { Idoctor } from './doctor';

export interface Message {
  _id?:string;
  senderId: string | Iuser | Idoctor;
  recieverId: string | Idoctor | Iuser;
  message?: string;
  image?:string;
  messageType:'text'|'image'
  read?: boolean; 
 
}
