import { Iuser } from './user';
import { Idoctor } from './doctor';

export interface Message {
  senderId: string | Iuser | Idoctor;
  recieverId: string | Idoctor | Iuser;
  message: string;
  read?: boolean; 
 
}
