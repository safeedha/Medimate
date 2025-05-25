import {slotRepository} from '../../../domain/repository/slot-repository';

import{IRecurring} from '../../../domain/entities/recurringslot'

export class GetRecurringSlot {

  constructor(private slotrepository: slotRepository) {}
  async getSlots(id:string): Promise<IRecurring[]> {
    try {
      const slots= await this.slotrepository.getAllreccslots(id)
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