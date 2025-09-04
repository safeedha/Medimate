export interface NotificationDto {
  _id?: string;
  type: "consultation"|"cancellation" |"refund"|"reschedule"|"followup"            
  message: string;           
  createdAt?: string;           
}