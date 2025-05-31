import { Iuser } from './user';
import { Idoctor } from './doctor';
import { Message } from './messages';

type Participation = string | Iuser | Idoctor;

export interface Conversation {
  participant: Participation[]; // plural would be better as `participants`
  messages: Message[];
}