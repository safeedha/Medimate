import {Iuser} from './user';
import {Idoctor} from './doctor'
export interface Message{
  senderId:string|Iuser,
  recieverId:string|Idoctor,
  message:string
}