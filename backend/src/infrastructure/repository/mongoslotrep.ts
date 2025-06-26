 import {IRecurring} from '../../domain/entities/recurringslot'
 import {IndividualSlot} from '../../domain/entities/slot'
import {slotRepository} from '../../domain/repository/slot-repository'
import {Recurring} from '../database/models/recurringslot'
import {Slot}  from '../database/models/scedule'
import { SlotLock}  from '../database/models/slotlock'
import { SlotLockDTO,RecurringDTO} from '../../dto/slot.dto';
export class MongoSlotRepostory implements slotRepository{
    
async  lockAvailableSlot(data: SlotLockDTO): Promise<string> {
  try {

    const existingLock = await SlotLock.findOne({
      doctorId: data.doctorId,
      slotId: data.slotId,
      status: { $in: ['locked', 'confirmed'] },
    });

    if (existingLock) {
      throw new Error('Slot is already locked or confirmed');
    }

    const slotLock = new SlotLock({
      doctorId: data.doctorId,
      slotId: data.slotId,
      status: 'locked',
    });

    await slotLock.save();
    return 'Slot is locked';
  } catch (error) {
    if(error instanceof Error)
      {
       
        throw Error(error.message)
      }
      throw Error("Somethin happend")
    }
  }

   async createRecurringSlot(data: RecurringDTO): Promise<RecurringDTO> {
  try {
    const existingSlots = await Recurring.find({
      doctorId: data.doctorId,
      startDate: { $lte: data.endDate },
      endDate: { $gte: data.startDate },
      starttime: { $lte: data.endttime },
      endttime: { $gte: data.starttime }
    });

    for (const slot of existingSlots) {
      const sharedDays = slot.daysOfWeek.filter((day) => data.daysOfWeek.includes(day));
      if (sharedDays.length > 0) {
        throw new Error(
          `Recurring schedule conflict: Overlapping with existing slot from ${slot.startDate.toDateString()} to ${slot.endDate.toDateString()} on [${sharedDays.join(", ")}] between ${slot.starttime} and ${slot.endttime}.`
        );
      }
    }

    const recurring = new Recurring(data);
    const savedRecurring = await recurring.save();

    const response: RecurringDTO = {
      _id: savedRecurring._id.toString(),
      doctorId: typeof savedRecurring.doctorId === 'string'
        ? savedRecurring.doctorId
        : savedRecurring.doctorId?._id?.toString() || '',
      startDate: savedRecurring.startDate,
      endDate: savedRecurring.endDate,
      frequency: savedRecurring.frequency,
      interval: savedRecurring.interval,
      daysOfWeek: savedRecurring.daysOfWeek,
      starttime: savedRecurring.starttime,
      endttime: savedRecurring.endttime
    };

    return response;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("Something happened");
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

  async getAllreccslots(
  id: string,
  page: number,
  limit: number
): Promise<{ data: RecurringDTO[]; total: number }> {
  try {
    const skip = (page - 1) * limit;
    const recurring = await Recurring.find({ doctorId: id })
      .sort({ createdAt: 1 })
      .skip(skip)
      .limit(limit);
    const total = await Recurring.countDocuments({ doctorId: id });
    const mapped: RecurringDTO[] = recurring.map((slot) => ({
      _id: slot._id.toString(),
      doctorId:
        typeof slot.doctorId === 'string'
          ? slot.doctorId
          : slot.doctorId?._id?.toString() || '',
      startDate: slot.startDate,
      endDate: slot.endDate,
      frequency: slot.frequency,
      interval: slot.interval,
      daysOfWeek: slot.daysOfWeek,
      starttime: slot.starttime,
      endttime: slot.endttime,
    }));

    return {
      data: mapped,
      total,
    };
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("Something happened");
  }
}

 async getSlotsByDate(id: string, date: Date): Promise<IndividualSlot[]> {
  try {
    const now = new Date();

    const startOfDay = new Date(date);
    startOfDay.setUTCHours(0, 0, 0, 0); // 00:00:00 UTC

    const endOfDay = new Date(date);
    endOfDay.setUTCHours(23, 59, 59, 999); // 23:59:59.999 UTC

    const isToday =
      now.getUTCFullYear() === startOfDay.getUTCFullYear() &&
      now.getUTCMonth() === startOfDay.getUTCMonth() &&
      now.getUTCDate() === startOfDay.getUTCDate();

    const baseQuery: any = {
      doctorId: id,
      date: { $gte: startOfDay, $lte: endOfDay },
    };

    if (isToday) {
   
      const currentTime = now.toISOString().split('T')[1]?.slice(0, 5); // e.g., "14:30"
      baseQuery.startingTime = { $gt: currentTime };
    }

    const slots = await Slot.find(baseQuery).sort({ startingTime: 1 });

    return slots;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("An unknown error occurred");
    }
  }
}

 async changeStatus(id:string):Promise<{message:string}>{
    try{
      const slot=await Slot.findById(id)
      if(!slot)
      {
        throw new Error("Slot not found")
      }
      if(slot.status==="available")
      {
       slot.status="booked"
      }
      else{
        slot.status="available"
      }
    
      await slot.save()
      console.log(slot)
      return {message:`Slot status changed ${slot.status}`}
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

   async cancelreccslots(id: string): Promise<string> {
  try {
    const slots = await Slot.find({ recurringSlotId: id });

    if (slots.length === 0) {
      throw new Error("No slots found with the given recurringSlotId");
    }

    const isAnyBooked = slots.some(slot => slot.status === "booked");

    if (isAnyBooked) {
      throw new Error("Cannot cancel because one or more slots are already booked");
    }

    await Slot.deleteMany({ recurringSlotId: id });
    await Recurring.deleteOne({_id: id })

    return "Recurring slots cancelled successfully";
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("Something happened");
  }
}


 async deleteslot(id:string):Promise<string>{
  try{
     const slots = await Slot.deleteOne({ _id: id });
     return "slot cancelled successfully";
  }
  catch(error)
  {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("Something happened");
  }
 }



}
// async getSlotsByDate(id: string, date: Date): Promise<IndividualSlot[]> {
//   try {
//     const startOfDay = new Date(date);
//     startOfDay.setUTCHours(0, 0, 0, 0); // 00:00:00.000 UTC

//     const endOfDay = new Date(date);
//     endOfDay.setUTCHours(23, 59, 59, 999); // 23:59:59.999 UTC

//     const slots = await Slot.find({
//       doctorId: id,
//       date: { $gte: startOfDay, $lte: endOfDay }
//     }).sort({ startingTime: 1 });

//     return slots;
//   } catch (error) {
//     if (error instanceof Error) {
//       throw new Error(error.message);
//     } else {
//       throw new Error("An unknown error occurred");
//     }
//   }
// }
