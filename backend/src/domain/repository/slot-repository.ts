 import {IRecurring} from '../entities/recurringslot'
 import {IndividualSlot} from '../entities/slot'

 export interface slotRepository{
  createRecurringSlot(data:IRecurring):Promise<IRecurring>
  createSlot(data:IndividualSlot):Promise<IndividualSlot>
  changeStatus(id:string):Promise<{message:string}>
  checkSlot(id:string,date:Date,satrtingtime:string,endingTime:string):Promise<{message:string}>
  getAllreccslots(id:string):Promise<IRecurring[]>
  getSlotsByDate(id:string, date:Date): Promise<IndividualSlot[]>
  cancelreccslots(id:string):Promise<string>
 }