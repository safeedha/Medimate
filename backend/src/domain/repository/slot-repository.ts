
 import {IndividualSlot} from '../entities/slot'
import { SlotLockDTO,RecurringDTO} from '../../dto/slot.dto';
 export interface slotRepository{
  createRecurringSlot(data:RecurringDTO):Promise<RecurringDTO>
  createSlot(data:IndividualSlot):Promise<IndividualSlot>
  changeStatus(id:string):Promise<{message:string}>
  checkSlot(id:string,date:Date,satrtingtime:string,endingTime:string):Promise<{message:string}>
  getAllreccslots(id:string,page:number,limit:number):Promise<{ data: RecurringDTO[]; total: number }>
  getSlotsByDate(id:string, date:Date): Promise<IndividualSlot[]>
  cancelreccslots(id:string):Promise<string>
  deleteslot(id:string):Promise<string>
  lockAvailableSlot(data:SlotLockDTO):Promise<string>
  
 }