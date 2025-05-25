
import {IRecurring} from './recurringslot'
import{Idoctor} from './doctor'
export type SlotStatus = "available" | "booked" | "cancelled";

export interface IndividualSlot {
  _id?: string;                 // use string if you prefer or ObjectId for backend
  recurringSlotId: string|IRecurring      // reference to the recurring slot (_id as string)
  doctorId: string|Idoctor;             // the doctor related to this slot
  date: Date;
  startingTime:string;
  endTime:string             // date and time of the individual slot
  status: SlotStatus;           
               
}