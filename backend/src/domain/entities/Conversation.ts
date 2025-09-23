
import { Message } from './Messages';

export interface Conversation {
  participant: string[]; // plural would be better as `participants`
  messages: Message[];
}