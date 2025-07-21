export interface IAddNotification {
  addnotification(user:string,doctor:string,message:string,type:"consultation" | "cancellation" | "refund" | "schedule"|"followup"): Promise<void>;
}