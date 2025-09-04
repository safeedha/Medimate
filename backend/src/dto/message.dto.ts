export type UnreadCounts = Record<string, number>;

export interface MessageDto {
  _id?:string;
  senderId: string 
  recieverId: string;
  message?: string;
  image?:string;
  messageType:'text'|'image'
  read?: boolean; 
}