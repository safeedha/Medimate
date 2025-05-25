 import {IRecurring} from '../entities/recurringslot'
 import {IndividualSlot} from '../entities/slot'

 export interface slotRepository{
  createRecurringSlot(data:IRecurring):Promise<IRecurring>
  createSlot(data:IndividualSlot):Promise<IndividualSlot>
  checkSlot(id:string,date:Date,satrtingtime:string,endingTime:string):Promise<{message:string}>
  getAllreccslots(id:string):Promise<IRecurring[]>
 }