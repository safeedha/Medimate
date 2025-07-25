import {slotRepository} from '../../../domain/repository/slot-repository';
import {IndividualSlot} from '../../../domain/entities/slot'
import { IGetSlotByDate } from '../../../domain/useCaseInterface/slot/IGetSlotByDate';
export class GetSlotByDate implements IGetSlotByDate{
  constructor(private slotrepository: slotRepository) {}

  async getSlotsByDate(id: string, date: Date): Promise<IndividualSlot[]> {
    try {
      const slots = await this.slotrepository.getSlotsByDate(id, date);
      return slots;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error("An unknown error occurred");
      }
    }
  }
}