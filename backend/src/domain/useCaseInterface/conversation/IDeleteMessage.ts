export interface IDeleteMessage {
  delete(messageId: string, sender: string, receiver: string): Promise<string>; // Adjust return type if needed
}