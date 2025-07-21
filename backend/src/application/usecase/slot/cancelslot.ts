import {slotRepository} from '../../../domain/repository/slot-repository';
import { ICancelRecurringSlot } from '../../../domain/useCaseInterface/slot/ICancelRecurringSlot';


export class CancelRecurringSlot implements ICancelRecurringSlot{

  constructor(private slotrepository: slotRepository) {}
  async cancelSlots(id:string): Promise<string> {
    try {
      const slots= await this.slotrepository.cancelreccslots(id)
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