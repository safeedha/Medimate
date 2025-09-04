
import {IRecurring} from './Recurringslot'
import{Idoctor} from './Doctor'
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