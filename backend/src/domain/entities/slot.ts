
import {IRecurring} from './recurringslot'
import{Idoctor} from './doctor'
export type SlotStatus = "available" | "booked" | "cancelled";

export interface IndividualSlot {
  _id?: string;             
  recurringSlotId: string|IRecurring      
  doctorId: string|Idoctor;            
  date: Date;
  startingTime:string;
  endTime:string           
  status: SlotStatus;           
               
}