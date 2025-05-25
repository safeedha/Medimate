 import {IRecurring} from '../../domain/entities/recurringslot'
 import {IndividualSlot} from '../../domain/entities/slot'
import {slotRepository} from '../../domain/repository/slot-repository'
import {Recurring} from '../database/models/recurringslot'
import {Slot}  from '../database/models/scedule'
export class MongoSlotRepostory implements slotRepository{
   async createRecurringSlot(data:IRecurring):Promise<IRecurring>{
    try{
    const isOverlap = await Recurring.findOne({
  doctorId: data.doctorId,
  startDate: { $lte: data.endDate },
  endDate: { $gte: data.startDate },
  starttime: { $lte: data.endttime },
  endttime: { $gte: data.starttime }
});

if (isOverlap) {
  throw new Error(`Recurring schedule conflict: The selected date and time range overlaps with an existing schedule from ${isOverlap.startDate.toDateString()} ${isOverlap.starttime} to ${isOverlap.endDate.toDateString()} ${isOverlap.endttime}.`);
}
           const recurring=new Recurring(data)
                await recurring.save()
                return recurring
       
   }
    catch(error)
    {
      if(error instanceof Error)
      {
       
        throw Error(error.message)
      }
      throw Error("Somethin happend")
    }

   } 
   async createSlot(data:IndividualSlot):Promise<IndividualSlot>
   {
     const slot=new Slot(data)
     await slot.save()
     return slot
   }
   async checkSlot(id:string,date:Date,satrtingtime:string,endingTime:string):Promise<{message:string}>{
    return {message:"Good"}
   }

   async getAllreccslots(id:string):Promise<IRecurring[]>{
    try{
       const recurring=await Recurring.find({doctorId:id}).sort({createdAt:1})
       return recurring
    }
    catch(error)
    {
       if(error instanceof Error)
      {
       
        throw Error(error.message)
      }
      throw Error("Somethin happend")
    }
   }
}
