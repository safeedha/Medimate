import {ISlotRepository} from '../../../domain/repository/SlotRepository';
import { ICancelSlot } from '../../../domain/useCaseInterface/slot/ICancelSlot';


export class CancelSlot implements ICancelSlot{

  constructor(private slotrepository: ISlotRepository) {}
  async cancelSlot(id:string): Promise<string> {
    try {
      const slots= await this.slotrepository.deleteslot(id)
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