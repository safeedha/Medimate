
 import {IndividualSlot} from '../entities/Sot'
import { SlotLockDTO} from '../../dto/slot.dto';
import {IRecurring } from '../entities/Recurringslot'
 export interface ISlotRepository{
  createRecurringSlot(data:IRecurring):Promise<IRecurring>
  createSlot(data:IndividualSlot):Promise<IndividualSlot>
  editRecurringSlot(data:IRecurring):Promise<IRecurring>
  changeStatus(id:string):Promise<{message:string}>
  getAllreccslots(id:string,page:number,limit:number):Promise<{ data: IRecurring[]; total: number }>
  getSlotsByDate(id:string, date:Date): Promise<IndividualSlot[]>
  cancelreccslots(id:string):Promise<string>
  deleteslot(id:string):Promise<string>
  lockAvailableSlot(data:SlotLockDTO):Promise<string>
  deletrRecurringSlot(recId:string):Promise<void>
  
 }