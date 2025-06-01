import { Iuser } from './user';
import { Idoctor } from './doctor';
import { Message } from './messages';

type Participation = string | Iuser | Idoctor;

export interface Conversation {
  participant: String[]; // plural would be better as `participants`
  messages: Message[];
}