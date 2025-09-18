
import {IRecurring} from './Recurringslot'
import{IDoctor} from './Doctor'
export type SlotStatus = "available" | "booked" | "cancelled";

export interface IndividualSlot {
  _id?: string;             
  recurringSlotId: string|IRecurring      
  doctorId: string|IDoctor;            
  date: Date;
  startingTime:string;
  endTime:string           
  status: SlotStatus;           
               
}


export interface ISlotLock {
  doctorId: string;               
  slotId: string;         
  status?: 'locked' | 'confirmed' | 'expired'; 
}
