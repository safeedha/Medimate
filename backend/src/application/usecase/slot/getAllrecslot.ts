import {slotRepository} from '../../../domain/repository/slot-repository';
import {RecurringDTO} from '../../../dto/slot.dto';
import { IGetRecurringSlot } from '../../../domain/useCaseInterface/slot/IGetRecurringSlot';

export class GetRecurringSlot implements IGetRecurringSlot{

  constructor(private slotrepository: slotRepository) {}
  async getSlots(id:string,page:number,limit:number): Promise<{ data: RecurringDTO[]; total: number }> {
    try {
      const slots= await this.slotrepository.getAllreccslots(id,page,limit)
      return slots
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error("An unknown error occurred");
      }
    }

 
  }
}