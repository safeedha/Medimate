import {ISlotRepository} from '../../../domain/repository/SlotRepository';
import {RecurringDTO} from '../../../dto/slot.dto';
import { IGetRecurringSlot } from '../../../domain/useCaseInterface/slot/IGetRecurringSlot';

export class GetRecurringSlot implements IGetRecurringSlot{

  constructor(private _slotrepository: ISlotRepository) {}
  async getSlots(id:string,page:number,limit:number): Promise<{ data: RecurringDTO[]; total: number }> {
    try {
      const slots= await this._slotrepository.getAllreccslots(id,page,limit)
       const mapped: RecurringDTO[] = slots.data.map((slot) => ({
            _id: slot._id!.toString(),
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
      
      return {data:mapped,total:slots.total}
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error("An unknown error occurred");
      }
    }

 
  }
}