import {slotRepository} from '../../../domain/repository/slot-repository';

import{IRecurring} from '../../../domain/entities/recurringslot'

export class CancelRecurringSlot {

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