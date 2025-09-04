export interface INotification {
  _id?: string;
  userId?: string;  
  type: "consultation"|"cancellation" |"refund"|"reschedule"|"followup"           
  senderId?: string;           
  message: string;           
  createdAt?: string;  
  isRead:boolean     
}